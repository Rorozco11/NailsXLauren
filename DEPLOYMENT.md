# Vercel Deployment Guide

## Quick Deploy to Vercel

### Method 1: Vercel CLI (Recommended)

1. **Install Vercel CLI globally:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy from project directory:**
   ```bash
   # For preview deployment
   npm run preview
   
   # For production deployment
   npm run deploy
   ```

### Method 2: GitHub Integration

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables (see below)
   - Deploy

## Environment Variables Setup

**CRITICAL**: You must add these environment variables in Vercel:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add these variables:

```
SENDEREMAIL = laurenorozco0@gmail.com
SENDERPASSWORD = hhdv zavn zhde nvmz
```

4. **Important**: Add to all environments:
   - ✅ Production
   - ✅ Preview  
   - ✅ Development

## Post-Deployment Checklist

- [ ] Environment variables configured
- [ ] Email functionality tested
- [ ] All pages loading correctly
- [ ] Booking form working
- [ ] Mobile responsiveness verified

## Troubleshooting

### Email Not Working?
- Verify environment variables are set correctly
- Check Vercel function logs in dashboard
- Ensure Gmail App Password is correct

### Build Errors?
- Run `npm run build` locally first
- Check for TypeScript errors
- Verify all dependencies are installed

## Custom Domain (Optional)

1. In Vercel dashboard, go to **Settings** → **Domains**
2. Add your custom domain
3. Update DNS records as instructed
4. SSL certificate will be automatically provisioned
