#!/bin/bash

# Ailydian AI - Local Development Server with Ngrok
# Usage: ./dev-server.sh

echo "🚀 Starting Ailydian AI Development Server..."
echo ""

# Check if ngrok is installed
if ! command -v ngrok &> /dev/null; then
    echo "❌ ngrok not found! Please install ngrok first:"
    echo "   brew install ngrok"
    echo "   or visit: https://ngrok.com/download"
    exit 1
fi

# Check if port 3000 is available
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 3000 is already in use!"
    echo "   Killing existing process..."
    kill -9 $(lsof -t -i:3000)
    sleep 2
fi

# Start local server (adjust based on your setup)
echo "📦 Starting local HTTP server on port 3000..."

# Option 1: Python simple server
# python3 -m http.server 3000 &

# Option 2: Node.js http-server (install with: npm install -g http-server)
# http-server -p 3000 &

# Option 3: Vercel dev
vercel dev --listen 3000 &

SERVER_PID=$!
echo "✅ Server started (PID: $SERVER_PID)"
sleep 3

# Start ngrok with traffic policy
echo ""
echo "🌐 Starting ngrok tunnel with rate limiting..."
echo "   Rate Limit: 100 requests/minute per IP"
echo "   Hourly Limit: 1000 requests/hour per IP"
echo ""

# Start ngrok with custom config
if [ -f "rate-limit.yml" ]; then
    ngrok http 3000 \
        --domain your-endpoint.ngrok.app \
        --config .ngrok.yml \
        --log=stdout
else
    echo "⚠️  rate-limit.yml not found, starting without traffic policy"
    ngrok http 3000 --domain your-endpoint.ngrok.app
fi

# Cleanup on exit
trap "kill $SERVER_PID 2>/dev/null; echo ''; echo '🛑 Development server stopped.'" EXIT
