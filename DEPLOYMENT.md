# DevHakim Portfolio - Deployment Guide

## IONOS Deployment with CI/CD

This project is configured for automatic deployment to IONOS using GitHub Actions.

### Setup Instructions

#### 1. IONOS Configuration

**Option A: IONOS Deploy Now (Recommended)**
1. Log into your IONOS account
2. Navigate to Deploy Now section
3. Connect your GitHub repository: `https://github.com/HakimZ78/devhakim.git`
4. Get your API credentials:
   - API Key
   - Service Host URL

**Option B: Traditional FTP Hosting**
1. Enable static website hosting in IONOS control panel
2. Note your FTP credentials:
   - FTP Server
   - Username  
   - Password
   - Server directory (usually `/` or `/html`)

#### 2. GitHub Secrets Configuration

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:

**For IONOS Deploy Now:**
```
IONOS_API_KEY=your_api_key_here
IONOS_SERVICE_HOST=your_service_host_here
NEXT_PUBLIC_SUPABASE_URL=https://ldlvnbfxjgvqpfypdbxg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**For FTP Deployment (Alternative):**
```
FTP_SERVER=your_ftp_server
FTP_USERNAME=your_ftp_username
FTP_PASSWORD=your_ftp_password
NEXT_PUBLIC_SUPABASE_URL=https://ldlvnbfxjgvqpfypdbxg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### 3. Domain Configuration

1. Point your domain `devhakim.com` to IONOS hosting
2. Enable SSL certificate (usually automatic)
3. Configure DNS if needed

### How CI/CD Works

1. **Push to main branch** → Triggers GitHub Actions
2. **Build process** → Installs dependencies, runs TypeScript check, builds static files
3. **Deploy** → Automatically uploads to IONOS
4. **Live site** → Your changes are live at devhakim.com

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Test static export
npm run build && npx serve out
```

### Content Updates

#### Dynamic Content (No deployment needed):
- Journey page edits (learning paths, milestones, certifications)
- Blog posts (when connected to CMS)
- Skills and projects updates

These update in real-time via Supabase.

#### Code Changes (Triggers deployment):
- Component updates
- Styling changes
- New pages or features
- Configuration changes

### Troubleshooting

#### Build Failures:
- Check GitHub Actions logs in your repository
- Verify all secrets are set correctly
- Ensure TypeScript errors are fixed

#### Deployment Issues:
- Verify IONOS credentials
- Check if domain is properly configured
- Review IONOS Deploy Now status

#### Content Not Updating:
- Dynamic content: Check Supabase connection
- Static content: May need deployment via GitHub push

### Manual Deployment (Backup Method)

If automated deployment fails:

```bash
# Build static export
npm run build

# Upload contents of 'out' folder to IONOS via:
# - FTP client (FileZilla, etc.)
# - IONOS File Manager
# - Command line FTP
```

### Support

- GitHub Actions logs: Check your repository Actions tab
- IONOS support: Access through your IONOS control panel
- Next.js deployment: https://nextjs.org/docs/deployment#static-exports