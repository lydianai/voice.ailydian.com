// Ailydian AI Chat API - GROQ Integration with Rate Limiting
// In-memory rate limiting store
const requestStore = new Map();

// Rate limiting function
function checkRateLimit(ip, limit = 100, window = 60000) {
    const now = Date.now();
    const userRequests = requestStore.get(ip) || [];
    const recentRequests = userRequests.filter(time => now - time < window);

    if (recentRequests.length >= limit) {
        return { allowed: false, remaining: 0, resetAt: Math.min(...recentRequests) + window };
    }

    recentRequests.push(now);
    requestStore.set(ip, recentRequests);

    // Cleanup old entries
    if (requestStore.size > 10000) {
        const cutoff = now - window;
        for (const [key, times] of requestStore.entries()) {
            if (times.every(t => t < cutoff)) requestStore.delete(key);
        }
    }

    return { allowed: true, remaining: limit - recentRequests.length, resetAt: now + window };
}

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Rate limiting check
    const clientIp = req.headers['x-forwarded-for']?.split(',')[0] ||
                     req.headers['x-real-ip'] ||
                     req.socket.remoteAddress ||
                     'unknown';

    const rateLimit = checkRateLimit(clientIp, 100, 60000);

    // Set rate limit headers
    res.setHeader('X-RateLimit-Limit', '100');
    res.setHeader('X-RateLimit-Remaining', rateLimit.remaining.toString());
    res.setHeader('X-RateLimit-Reset', new Date(rateLimit.resetAt).toISOString());

    if (!rateLimit.allowed) {
        const retryAfter = Math.ceil((rateLimit.resetAt - Date.now()) / 1000);
        res.setHeader('Retry-After', retryAfter.toString());
        return res.status(429).json({
            error: 'Rate limit exceeded',
            message: 'Çok fazla istek gönderildi. Lütfen bir dakika bekleyip tekrar deneyin.',
            retryAfter: retryAfter,
            limit: '100 requests per minute'
        });
    }

    try {
        const { message, conversationHistory = [] } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Build messages array
        const messages = [
            {
                role: 'system',
                content: 'Sen Ailydian AI, Türkiye\'nin en gelişmiş sesli yapay zeka asistanısın. Siri ve ChatGPT kalitesinde, son derece akıcı, doğal ve profesyonel Türkçe konuşuyorsun. Yanıtların kısa (1-2 cümle), öz, samimi ama kibar. Kullanıcıyla sürekli sohbet ediyormuşsun gibi akıcı devam et. Her yanıtta soru sor veya konuşmayı devam ettir. Türkçe dilbilgisine kusursuz uygun konuş. İsmin Ailydian AI.'
            },
            ...conversationHistory,
            {
                role: 'user',
                content: message
            }
        ];

        // Call GROQ API - Use environment variable for API key
        const groqApiKey = process.env.GROQ_API_KEY || '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';

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${groqApiKey}`
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant',
                messages: messages,
                temperature: 0.7,
                max_tokens: 200,
                stream: false
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('GROQ API error:', errorData);
            return res.status(response.status).json({
                error: 'AI service error',
                details: errorData
            });
        }

        const data = await response.json();

        if (!data || !data.choices || !data.choices[0]) {
            return res.status(500).json({ error: 'Invalid AI response' });
        }

        const aiResponse = data.choices[0].message.content;

        return res.status(200).json({
            response: aiResponse,
            success: true
        });

    } catch (error) {
        console.error('Chat API error:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
}
