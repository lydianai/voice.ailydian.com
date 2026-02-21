# 🚀 Voice.Ailydian.com - Deployment Guide

## 📋 Prerequisites

1. **Vercel Account** - https://vercel.com/signup
2. **GROQ API Key** - https://console.groq.com/keys
3. **Vercel CLI** - `npm install -g vercel`

---

## 🔑 Step 1: Get GROQ API Key

1. Visit https://console.groq.com
2. Sign up or log in
3. Go to API Keys section
4. Create new API key
5. Copy the key (starts with `gsk_...`)

---

## 📦 Step 2: Prepare Project

```bash
# Navigate to project folder
cd /Users/sardag/Desktop/voice-ailydian-final

# Verify files
ls -la

# Expected files:
# - index.html
# - api/chat.js
# - vercel.json
# - package.json
# - README.md
# - .gitignore
```

---

## 🌐 Step 3: Deploy to Vercel

### Option A: Via CLI (Recommended)

```bash
# Login to Vercel
vercel login

# Link to existing project (if updating)
vercel link --project lydian-voice-pwa

# Or create new project
vercel

# Deploy to production
vercel --prod

# Set environment variable
vercel env add GROQ_API_KEY production
# Paste your GROQ API key when prompted
```

### Option B: Via Vercel Dashboard

1. Go to https://vercel.com/new
2. Import Git Repository or Upload Files
3. Select `voice-ailydian-final` folder
4. Configure:
   - **Framework Preset:** Other
   - **Root Directory:** ./
   - **Build Command:** (leave empty)
   - **Output Directory:** (leave empty)
5. Add Environment Variable:
   - **Key:** `GROQ_API_KEY`
   - **Value:** Your GROQ API key
6. Click **Deploy**

---

## 🔗 Step 4: Configure Custom Domain

### In Vercel Dashboard:

1. Go to your project
2. Click **Settings** → **Domains**
3. Add domain: `voice.ailydian.com`
4. Follow DNS configuration instructions:

```
Type: CNAME
Name: voice
Value: cname.vercel-dns.com
```

5. Wait for DNS propagation (~5-30 minutes)

---

## ✅ Step 5: Verify Deployment

### Test API Endpoint:
```bash
curl -X POST "https://voice.ailydian.com/api/chat" \
  -H "Content-Type: application/json" \
  -d '{"message":"Test","conversationHistory":[]}'

# Expected:
# {"response":"...","success":true}
```

### Test Frontend:
```bash
# Open in browser
open https://voice.ailydian.com

# Try voice commands:
# 1. Allow microphone permission
# 2. Click start button or say "Hey Lydian"
# 3. Ask: "Merhaba, nasılsın?"
```

---

## 🔧 Step 6: Configure Production Settings (Optional)

### Add Additional Environment Variables:

```bash
# Max history messages (default: 5)
vercel env add MAX_HISTORY production
# Enter: 5

# Retry attempts (default: 3)
vercel env add MAX_RETRIES production
# Enter: 3

# API timeout (default: 30000ms)
vercel env add API_TIMEOUT production
# Enter: 30000
```

### Update Serverless Function (api/chat.js):

```javascript
// Use environment variables
const MAX_RETRIES = parseInt(process.env.MAX_RETRIES) || 3;
const API_TIMEOUT = parseInt(process.env.API_TIMEOUT) || 30000;
```

---

## 📊 Step 7: Monitor Production

### View Logs:
```bash
# Real-time logs
vercel logs voice.ailydian.com --follow

# Last 100 logs
vercel logs voice.ailydian.com -n 100
```

### View Analytics:
1. Go to Vercel Dashboard
2. Select `lydian-voice-pwa` project
3. Click **Analytics** tab
4. Monitor:
   - Page views
   - API calls
   - Response times
   - Error rates

### View Function Logs:
1. Go to **Functions** tab
2. Click `/api/chat`
3. View invocation logs

---

## 🔄 Step 8: Update Production

### Quick Update (CLI):
```bash
cd /Users/sardag/Desktop/voice-ailydian-final

# Make changes to files...

# Deploy to production
vercel --prod

# Or specific file
vercel --prod --force
```

### Rollback:
```bash
# List deployments
vercel ls

# Promote previous deployment
vercel promote <deployment-url>
```

---

## 🐛 Troubleshooting

### Issue: API Returns 500 Error

**Solution:**
```bash
# Check environment variable
vercel env ls

# Update API key
vercel env rm GROQ_API_KEY production
vercel env add GROQ_API_KEY production

# Redeploy
vercel --prod --force
```

### Issue: Domain Not Working

**Solution:**
```bash
# Check DNS settings
dig voice.ailydian.com

# Should show CNAME pointing to Vercel

# Force DNS refresh
vercel domains inspect voice.ailydian.com
```

### Issue: Microphone Permission Denied

**Solution:**
- Only works on HTTPS (Vercel provides auto HTTPS)
- Check browser permissions: chrome://settings/content/microphone
- Try different browser

### Issue: Old Version Cached

**Solution:**
```bash
# Users need to hard refresh:
# Ctrl + Shift + R (Windows)
# Cmd + Shift + R (Mac)

# Or use cache-busting URL:
# https://voice.ailydian.com?v=20251210
```

---

## 📈 Performance Optimization

### Enable Compression:
Add to `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### Enable Edge Caching:
```javascript
// In api/chat.js
export const config = {
  runtime: 'edge',
};
```

---

## 🔒 Security Best Practices

### 1. Rotate API Keys Regularly:
```bash
# Every 90 days
vercel env rm GROQ_API_KEY production
vercel env add GROQ_API_KEY production
vercel --prod --force
```

### 2. Monitor API Usage:
- Check GROQ dashboard for unusual activity
- Set up alerts in Vercel for high error rates

### 3. Rate Limiting (Future):
```javascript
// Add to api/chat.js
const rateLimit = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
};
```

---

## 📞 Support Contacts

- **Vercel Support:** https://vercel.com/support
- **GROQ Support:** https://console.groq.com/support
- **Production URL:** https://voice.ailydian.com
- **Project Dashboard:** https://vercel.com/emrahsardag-yandexcoms-projects/lydian-voice-pwa

---

## 📝 Deployment Checklist

- [ ] GROQ API key obtained
- [ ] Vercel account created
- [ ] Project deployed
- [ ] Environment variable set
- [ ] Custom domain configured
- [ ] DNS propagated
- [ ] API endpoint tested
- [ ] Voice assistant tested
- [ ] Logs monitored
- [ ] Analytics reviewed

---

**Last Updated:** 2025-12-10
**Version:** 2.0.0
**Status:** ✅ Production Ready
