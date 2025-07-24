# IONOS VPS Deployment Guide

## Why VPS is Better for Your Portfolio

Your IONOS VPS Large is ideal because:
- **No extra cost** - Already included in your contract
- **Full Node.js support** - Run Next.js with all features
- **Better performance** - Dedicated resources
- **Multiple sites** - Host portfolio + future projects
- **Full control** - Install any software you need

## Initial VPS Setup

### 1. Connect to Your VPS
```bash
ssh root@your-vps-ip
# or
ssh username@your-vps-ip
```

### 2. Install Required Software
```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs

# Install PM2 (process manager)
npm install -g pm2

# Install Nginx (web server)
apt install -y nginx

# Install Git
apt install -y git
```

### 3. Setup Application Directory
```bash
# Create web directory
mkdir -p /var/www/devhakim
cd /var/www/devhakim

# Clone your repository
git clone https://github.com/HakimZ78/devhakim.git .

# Install dependencies
npm install

# Create environment file
nano .env.local
```

Add to .env.local:
```
NEXT_PUBLIC_SUPABASE_URL=https://ldlvnbfxjgvqpfypdbxg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
```

### 4. Configure Nginx
```bash
nano /etc/nginx/sites-available/devhakim
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name devhakim.com www.devhakim.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
ln -s /etc/nginx/sites-available/devhakim /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### 5. Start Application with PM2
```bash
cd /var/www/devhakim
npm run build
pm2 start npm --name "devhakim" -- start
pm2 save
pm2 startup
```

### 6. Setup SSL with Let's Encrypt
```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get SSL certificate
certbot --nginx -d devhakim.com -d www.devhakim.com
```

## Automated Deployment Options

### Option 1: GitHub Actions (Recommended)
Use the `.github/workflows/deploy-vps.yml` file already created.

Add these secrets to GitHub:
```
VPS_HOST=your-vps-ip
VPS_USERNAME=your-username
VPS_PORT=22
VPS_SSH_KEY=your-private-key
```

### Option 2: Webhook Deployment
```bash
# On VPS, create deployment script
nano /var/www/devhakim/deploy.sh
```

Add:
```bash
#!/bin/bash
cd /var/www/devhakim
git pull origin main
npm install
npm run build
pm2 restart devhakim
```

Make executable:
```bash
chmod +x deploy.sh
```

### Option 3: Manual Deployment
```bash
ssh user@your-vps
cd /var/www/devhakim
git pull
npm install
npm run build
pm2 restart devhakim
```

## Monitoring & Maintenance

### Check Application Status
```bash
pm2 status
pm2 logs devhakim
```

### Monitor Resources
```bash
htop  # CPU and memory usage
df -h  # Disk usage
```

### Update Application
```bash
cd /var/www/devhakim
git pull
npm install
npm run build
pm2 restart devhakim
```

## Advantages of VPS Deployment

1. **Full Next.js Features**
   - Server-side rendering (SSR)
   - API routes work perfectly
   - Dynamic content generation

2. **Better Performance**
   - Dedicated CPU and RAM
   - No cold starts
   - Faster response times

3. **Cost Effective**
   - Already included in your contract
   - Can host multiple projects
   - No bandwidth limits

4. **Future Flexibility**
   - Add databases locally
   - Run background jobs
   - Host additional services

## Content Update Process - Beginner Guide

### Step-by-Step: How to Update Your Website Content

**Important**: We deploy directly to your IONOS VPS via SSH, NOT through GitHub Actions.

#### Step 1: Make Changes Locally
1. **Open your project** in VS Code or your preferred editor
2. **Find the file to edit**:
   - Homepage text: `/src/components/home/Hero.tsx`
   - About section: `/src/components/home/InteractiveJourneyTimeline.tsx`
   - Skills: `/src/components/home/InteractiveSkillsShowcase.tsx`
   - Projects: `/src/components/home/FeaturedProjects.tsx`

3. **Make your changes** (edit text, update descriptions, etc.)

4. **Test locally**:
   ```bash
   # In your project folder on your Mac
   npm run dev
   ```
   - Visit `http://localhost:3002` to see your changes
   - Make sure everything looks correct

#### Step 2: Save Changes to GitHub
```bash
# In your project folder on your Mac
git add .
git commit -m "Update: describe what you changed"
git push origin main
```

#### Step 3: Connect to Your VPS
```bash
# From Terminal on your Mac
ssh -p 2222 forexuser@217.154.33.169
```
- You'll be connected to your IONOS VPS server
- You should see a command prompt like: `forexuser@vps-server:~$`

#### Step 4: Deploy Your Changes
```bash
# Once connected to VPS, navigate to your website folder
cd /var/www/devhakim

# Run the deployment script
./deploy.sh
```

**What the deploy script does:**
- Downloads your latest changes from GitHub
- Installs any new dependencies
- Builds your updated website
- Restarts the website server
- Shows success message when complete

#### Step 5: Verify Your Changes
- Visit `https://devhakim.com` in your browser
- Your changes should now be live!
- If changes don't appear immediately, try refreshing or clearing browser cache

### Manual Deployment (Alternative)
If the script doesn't work, run these commands one by one:
```bash
# Connect to VPS
ssh -p 2222 forexuser@217.154.33.169

# Navigate to website folder
cd /var/www/devhakim

# Download latest changes
git pull origin main

# Install any new packages
npm install

# Build the website
npm run build

# Restart the website
pm2 restart devhakim
```

### SSL Certificate Status
- **Current setup**: Let's Encrypt certificate installed via Certbot
- **Auto-renewal**: Already active via systemd timer (runs twice daily)
- **Do NOT use IONOS SSL**: Would conflict with existing certificate
- **Issue**: Browser shows "not secure" - nginx config needs SSL block update
- **Fix needed**: Manual nginx SSL configuration (requires root access)

### Automated Content Deployment

Create a deployment script on the VPS:
```bash
# SSH to VPS and create deploy script
ssh -p 2222 forexuser@217.154.33.169
cd /var/www/devhakim
nano deploy.sh
```

Add this content to deploy.sh:
```bash
#!/bin/bash
echo '🚀 Starting deployment...'
cd /var/www/devhakim

echo '📥 Pulling latest changes...'
git pull origin main

echo '📦 Installing dependencies...'
npm install

echo '🔨 Building application...'
npm run build

echo '🔄 Restarting PM2...'
pm2 restart devhakim

echo '✅ Deployment complete!'
echo '🌐 Site: https://devhakim.com'
```

Make it executable:
```bash
chmod +x deploy.sh
```

## Quick Commands Reference

```bash
# SSH to VPS
ssh -p 2222 forexuser@217.154.33.169

# Deploy updates (using script)
cd /var/www/devhakim && ./deploy.sh

# Or deploy manually
cd /var/www/devhakim && git pull && npm install && npm run build && pm2 restart devhakim

# Check app status
pm2 status

# View logs
pm2 logs devhakim

# Restart app
pm2 restart devhakim

# Check SSL certificate
curl -I https://devhakim.com

# Check SSL auto-renewal status
systemctl list-timers | grep certbot
```