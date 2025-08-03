#!/bin/bash

# Configuration
APP_DIR="/home/ec2-user/shabbos-frontend-next"
NGINX_CONF="/etc/nginx/nginx.conf"
NODE_ENV="production"
PM2_APP_NAME="shabbos-weather-report"

echo "🚀 Starting deployment for Shabbos Weather Report (Next.js)..."

echo "🔄 Switching to app directory..."
cd "$APP_DIR" || { echo "❌ Failed to enter $APP_DIR"; exit 1; }

echo "📥 Pulling latest changes from GitHub..."
git pull origin main || { echo "❌ Git pull failed"; exit 1; }

echo "📦 Installing dependencies..."
npm install || { echo "❌ npm install failed"; exit 1; }

echo "⚙️ Building Next.js app..."
npm run build || { echo "❌ Build failed"; exit 1; }

echo "🔍 Checking Nginx configuration..."
sudo nginx -t -c "$NGINX_CONF" || { echo "❌ Nginx config check failed"; exit 1; }

echo "🔄 Restarting PM2 process..."
pm2 restart "$PM2_APP_NAME" || pm2 start npm --name "$PM2_APP_NAME" -- start || { echo "❌ PM2 restart failed"; exit 1; }

echo "♻️ Reloading Nginx..."
sudo systemctl reload nginx || { echo "❌ Nginx reload failed"; exit 1; }

echo "✅ Deployment complete! App should be available at your domain."
echo "📊 PM2 Status:"
pm2 status