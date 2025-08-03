# Full path to app
APP_DIR="/home/ec2-user/shabbospdf-frontend"
NGINX_CONF="/etc/nginx/nginx.conf"
NODE_ENV="production"

echo "🔄 Switching to app directory..."
cd "$APP_DIR" || { echo "❌ Failed to enter $APP_DIR"; exit 1; }

echo "📥 Pulling latest changes..."
git pull origin main || { echo "❌ Git pull failed"; exit 1; }

echo "📦 Installing dependencies..."
npm install || { echo "❌ npm install failed"; exit 1; }

echo "⚙️ Building app..."
npm run build || { echo "❌ Build failed"; exit 1; }

echo "🔍 Checking Nginx configuration..."
sudo nginx -t -c "$NGINX_CONF" || { echo "❌ Nginx config check failed"; exit 1; }

echo "♻️ Reloading Nginx..."
sudo systemctl reload nginx || { echo "❌ Nginx reload failed"; exit 1; }

echo "✅ Deploy complete!"