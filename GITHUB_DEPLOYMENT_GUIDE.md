# Complete GitHub & Deployment Guide

Your pizza ordering application is ready to deploy! Follow this step-by-step guide.

## ⚠️ Prerequisites

Before you begin, make sure you have:

1. **Git installed**
   - Download: https://git-scm.com/download/win
   - Install and restart PowerShell/Terminal
   - Verify: `git --version`

2. **GitHub account**
   - Create: https://github.com/signup
   - Verify email
   - Ready to create repositories

3. **Node.js installed** (already done ✓)

4. **npm dependencies installed** (already done ✓)

## Step 1: Install Git (Windows)

Since Git is not installed on your system, follow these steps:

### Option A: Download & Install Manually

1. Visit: https://git-scm.com/download/win
2. Download Git for Windows
3. Run the installer
4. Choose default options (recommended)
5. Complete installation
6. **Restart PowerShell** or Terminal
7. Verify: Open new PowerShell and run:
   ```powershell
   git --version
   ```

### Option B: Install via Chocolatey (if you have it)

```powershell
choco install git
```

### Option C: Install via Microsoft Package Manager

```powershell
winget install Git.Git
```

After installing Git, restart PowerShell and continue with Step 2.

---

## Step 2: Configure Git

After installing, configure Git with your information:

```powershell
cd "c:\Users\user\Desktop\03-pizza menu"

# Set your Git username (use your GitHub username)
git config --global user.name "Your Name"

# Set your Git email (use your GitHub email)
git config --global user.email "your.email@example.com"

# Verify configuration
git config --global --list
```

---

## Step 3: Create GitHub Repository

1. Go to https://github.com/new
2. **Repository name**: `03-pizza-menu`
3. **Description**: "A modern pizza ordering web application with user authentication, shopping cart, and real-time order tracking"
4. **Public** (so others can see it)
5. **Do NOT** check "Initialize this repository with a README"
6. Click **"Create repository"**

You'll see a page with commands to push an existing repository. Copy the repository URL.

---

## Step 4: Initialize Local Git Repository

Open PowerShell and navigate to your project:

```powershell
cd "c:\Users\user\Desktop\03-pizza menu"

# Initialize git
git init

# Add all files
git add .

# Verify files are staged
git status
```

You should see all your files listed as "Changes to be committed" in green.

---

## Step 5: Create Initial Commit

```powershell
git commit -m "Initial commit: Pizza ordering app with authentication, cart, and order tracking"
```

---

## Step 6: Add Remote Repository

Replace `YOUR_USERNAME` with your actual GitHub username:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/03-pizza-menu.git
```

Verify the remote was added:

```powershell
git remote -v
```

You should see:
```
origin  https://github.com/YOUR_USERNAME/03-pizza-menu.git (fetch)
origin  https://github.com/YOUR_USERNAME/03-pizza-menu.git (push)
```

---

## Step 7: Set Main Branch

```powershell
git branch -M main
```

---

## Step 8: Push to GitHub

```powershell
git push -u origin main
```

This will prompt you for authentication. Choose one:

### Option A: GitHub Token (Recommended)
1. Go to https://github.com/settings/tokens
2. Click "Generate new token"
3. Select "Personal access tokens (classic)"
4. Check: `repo` scope
5. Set expiration: 90 days or custom
6. Copy the token
7. When prompted for password in Git, paste the token

### Option B: GitHub CLI
If you have GitHub CLI installed:
```powershell
gh auth login
gh auth setup-git
git push -u origin main
```

---

## Step 9: Verify on GitHub

1. Go to https://github.com/YOUR_USERNAME/03-pizza-menu
2. You should see all your files
3. Verify commit message appears

---

## 🚀 Step 10: Deploy to Vercel (Easiest)

### Setup Vercel

1. Go to https://vercel.com
2. Click "Sign up"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub
5. You'll be logged in to Vercel

### Deploy Your Repository

1. Click "New Project" on Vercel dashboard
2. You should see `03-pizza-menu` in your repositories
3. Click "Import" on the repository
4. **Configure Project**:
   - Framework: React
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `build`
5. Click "Deploy"
6. Wait for deployment to complete (usually 2-3 minutes)

### Get Your Live URL

After deployment completes:
- Vercel provides a URL like: `https://03-pizza-menu.vercel.app`
- Click the URL to test your deployed app
- Share this URL with others!

---

## Alternative: Deploy to Netlify

1. Go to https://netlify.com
2. Click "Sign up" → "GitHub"
3. Authorize Netlify
4. Click "Add new site" → "Import an existing project"
5. Select GitHub provider
6. Select `03-pizza-menu` repository
7. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `build`
8. Click "Deploy site"
9. Wait for deployment

---

## 🧪 Test Your Deployed App

After deployment:

1. Open your Vercel/Netlify URL
2. Test email login:
   - Email: john@example.com
   - Password: password123
3. Test phone login with any phone number
4. Test Google login with any email
5. Test cart and ordering
6. Test order tracking

---

## 🔄 Update Your App (After Deployment)

To make changes and redeploy:

```powershell
# Make changes to your code
# Edit files in src/

# Add changes
git add .

# Commit
git commit -m "Describe your changes"

# Push to GitHub
git push origin main
```

Vercel/Netlify will **automatically redeploy** your app! ✅

---

## 📊 Useful Git Commands

```powershell
# View your commits
git log --oneline

# Check current branch
git branch

# Create new branch for features
git checkout -b feature/new-feature

# Switch between branches
git checkout main

# View changes
git diff

# Undo last commit (before push)
git reset --soft HEAD~1

# See remote URLs
git remote -v

# Pull latest from GitHub
git pull origin main
```

---

## 🆘 Troubleshooting

### "Git not found"
- Git not installed yet
- **Solution**: Download and install from https://git-scm.com
- **Restart PowerShell after installation**

### "failed to push some refs"
```powershell
# Pull latest changes first
git pull origin main
# Then push again
git push origin main
```

### "Authentication failed"
- Wrong token/password
- **Solution**: 
  - Use GitHub Personal Access Token (not password)
  - Generate at: https://github.com/settings/tokens

### "fatal: remote origin already exists"
```powershell
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/03-pizza-menu.git
```

### "fatal: 'origin' does not appear to be a 'git' repository"
- Remote not set up correctly
- **Solution**:
```powershell
git remote add origin https://github.com/YOUR_USERNAME/03-pizza-menu.git
```

### Build fails on Vercel/Netlify
- Check build logs in platform dashboard
- Usually caused by missing dependencies
- **Solution**: Make sure all packages are in `package.json`

---

## 📝 Important Files to Check Before Push

- ✓ `package.json` - Updated with your info
- ✓ `README.md` - Complete documentation
- ✓ `.gitignore` - Proper configuration
- ✓ `src/` - All code files
- ✓ `public/` - All images and assets
- ✓ `build/` - Production build created

---

## 🎯 Complete Checklist

- [ ] Git installed and configured
- [ ] GitHub account created
- [ ] GitHub repository created
- [ ] Local git initialized
- [ ] Files staged with `git add .`
- [ ] Initial commit created
- [ ] Remote added
- [ ] Pushed to GitHub
- [ ] Verified files on GitHub
- [ ] Vercel/Netlify account created
- [ ] Repository imported to Vercel/Netlify
- [ ] Deployment completed
- [ ] Live URL tested
- [ ] All features working

---

## 🎉 Success Indicators

When everything is complete:
- ✅ GitHub URL works: `https://github.com/YOUR_USERNAME/03-pizza-menu`
- ✅ Live app URL works: `https://03-pizza-menu.vercel.app`
- ✅ Login works (all 3 methods)
- ✅ Cart functionality works
- ✅ Order tracking works
- ✅ Images load correctly

---

## 📞 Next Steps After Deployment

1. **Share your app**:
   - Post on LinkedIn
   - Add to GitHub profile
   - Share on Twitter
   - Add to portfolio

2. **Monitor your app**:
   - Check Vercel/Netlify logs
   - Set up error tracking (optional)
   - Monitor performance

3. **Improve your app**:
   - Add more features
   - Integrate real backend
   - Add database
   - Payment processing

4. **Keep code updated**:
   - Regular commits
   - Fix bugs quickly
   - Update dependencies

---

## 🚀 You're Ready!

Your pizza ordering app is about to go live! 

### Quick Summary:
1. Install Git from git-scm.com
2. Run: `git add .` → `git commit -m "..."` → `git push -u origin main`
3. Go to Vercel.com → Import your GitHub repo
4. Deploy and share your live URL!

**Your app will be live in minutes!** 🍕

---

For detailed help on any step, check:
- GIT_GITHUB_SETUP.md
- DEPLOYMENT.md
- QUICK_START.md

Good luck with your deployment! 🎉
