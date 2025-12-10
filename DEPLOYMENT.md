# Fast React Pizza Co. - Deployment Guide

## Prerequisites
- Node.js installed
- Git installed and configured
- GitHub account

## Step 1: Prepare for Deployment

### Update GitHub URLs in package.json
```json
"repository": {
  "type": "git",
  "url": "https://github.com/YOUR_USERNAME/03-pizza-menu.git"
},
"homepage": "https://github.com/YOUR_USERNAME/03-pizza-menu",
```

### Update Author Information
```json
"author": "Your Name",
```

## Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create new repository: `03-pizza-menu`
3. Do NOT initialize with README (we already have one)

## Step 3: Push to GitHub

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Pizza ordering app with authentication and order tracking"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/03-pizza-menu.git

# Push to main branch
git branch -M main
git push -u origin main
```

## Step 4: Deploy to Vercel (Recommended)

### Option A: Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Select your `03-pizza-menu` repository
5. Click "Deploy"
6. Done! Your app is live

### Option B: Using Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Answer prompts and follow instructions
```

## Step 5: Deploy to Netlify (Alternative)

1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect GitHub and select repository
4. Set build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
5. Click "Deploy site"
6. Done! Your app is live

## Step 6: Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to package.json scripts:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
```

3. Deploy:
```bash
npm run deploy
```

4. In GitHub Settings:
   - Go to Settings → Pages
   - Select "Deploy from a branch"
   - Select `gh-pages` branch
   - Save

## Environment Variables

If you have a `.env` file, add it to Vercel/Netlify:

**For Vercel:**
- Project Settings → Environment Variables
- Add each variable from your `.env` file

**For Netlify:**
- Site Settings → Build & Deploy → Environment
- Add each variable from your `.env` file

## Post-Deployment

1. Test your live application
2. Update README with your live URL
3. Share your project!

## Troubleshooting

### Build fails
- Check that all dependencies are in `package.json`
- Ensure no `.env` secrets are hardcoded

### App doesn't load
- Check browser console for errors
- Verify all image paths are correct
- Ensure `public` folder files are accessible

### Routing issues (404 on refresh)
- For Vercel: Automatically handled
- For Netlify: Add `_redirects` file in `public/`:
```
/* /index.html 200
```
- For GitHub Pages: App will work at `/03-pizza-menu/`

## Monitoring

- Vercel: Analytics dashboard built-in
- Netlify: Analytics available in premium
- Both: Monitor error logs in deployments tab

## Next Steps

1. Add backend API integration
2. Set up real database (MongoDB, PostgreSQL)
3. Implement payment processing
4. Add email notifications
5. Create admin dashboard

---

For more help, check platform-specific documentation:
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [GitHub Pages Docs](https://pages.github.com)
