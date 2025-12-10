# Git & GitHub Setup Guide

Your application is production-ready! Follow these steps to push to GitHub and deploy.

## Prerequisites

- Git installed: https://git-scm.com/download
- GitHub account: https://github.com/signup
- Updated `package.json` with your info

## Step-by-Step: Push to GitHub

### Step 1: Create Repository on GitHub

1. Go to https://github.com/new
2. **Repository name**: `03-pizza-menu`
3. **Description**: "A modern pizza ordering web application with authentication and order tracking"
4. **Public** (recommended, so others can see it)
5. **DO NOT** check "Initialize this repository with a README"
6. Click **"Create repository"**

### Step 2: Initialize Local Git (If Not Already Done)

```bash
cd c:\Users\user\Desktop\03-pizza menu

# Initialize git
git init

# Configure git (first time only)
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

### Step 3: Add All Files to Git

```bash
# Check status
git status

# Add all files
git add .

# Verify files are staged
git status
```

You should see all files listed as "Changes to be committed" (green).

### Step 4: Create Initial Commit

```bash
git commit -m "Initial commit: Pizza ordering app with authentication and order tracking"
```

### Step 5: Create Main Branch

```bash
git branch -M main
```

### Step 6: Add Remote Repository

Replace `YOUR_USERNAME` with your actual GitHub username:

```bash
git remote add origin https://github.com/YOUR_USERNAME/03-pizza-menu.git
```

### Step 7: Push to GitHub

```bash
git push -u origin main
```

This may prompt for GitHub credentials. Enter them.

## Verify Push Success

1. Go to https://github.com/YOUR_USERNAME/03-pizza-menu
2. You should see all your files listed
3. Verify the commit message shows

## Troubleshooting Git Issues

### "fatal: not a git repository"
```bash
cd c:\Users\user\Desktop\03-pizza menu
git init
```

### "fatal: remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/03-pizza-menu.git
```

### "Please tell me who you are"
```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

### "Authentication failed"
- Create Personal Access Token: https://github.com/settings/tokens
- Use token instead of password
- Or configure SSH keys

## After Push: Deploy to Vercel

### Option 1: Vercel Dashboard (Easiest)

1. Go to https://vercel.com
2. Click "New Project"
3. Click "Continue with GitHub"
4. Authorize Vercel to access GitHub
5. Select `03-pizza-menu` repository
6. Click "Import"
7. Click "Deploy"
8. Wait for deployment to complete
9. Your app is live! 🎉

**Share your URL**: Vercel gives you a public URL to share

### Option 2: Vercel CLI

```bash
# Install Vercel CLI (one time)
npm install -g vercel

# Deploy
vercel

# Follow prompts:
# 1. Link to existing project? (no)
# 2. Which scope? (your username)
# 3. Link to existing project? (no)
# 4. Project name? (03-pizza-menu)
# 5. Which directory? (.)
# 6. Settings confirmed? (yes)
```

Done! Your app is deployed and gets a URL.

## Continuous Deployment

After initial setup, every time you:
1. Make changes locally
2. Commit: `git commit -m "your message"`
3. Push: `git push origin main`

Vercel **automatically redeploys** your app! 🚀

## GitHub Best Practices

### Good Commit Messages
```bash
git commit -m "Add feature: order tracking timeline"
git commit -m "Fix: cart total calculation error"
git commit -m "Update: improve mobile responsive design"
```

### Bad Commit Messages
```bash
git commit -m "update"
git commit -m "fix bug"
git commit -m "changes"
```

### Create Branches for Features (Optional)

```bash
# Create new branch
git checkout -b feature/payment-integration

# Make your changes
git add .
git commit -m "Add payment processing"

# Push branch to GitHub
git push origin feature/payment-integration

# Create Pull Request on GitHub
# Then merge to main
```

## Useful Git Commands

```bash
# View commit history
git log --oneline

# Undo last commit (before push)
git reset --soft HEAD~1

# Undo changes to a file
git checkout -- src/index.js

# View what changed
git diff

# Create a tag for release
git tag v1.0.0
git push origin v1.0.0
```

## GitHub Repository Management

### Add to Description
Go to Repository Settings → Edit description:
```
A modern pizza ordering web application built with React. 
Features user authentication, shopping cart, and real-time order tracking.
```

### Add to Topics
Go to Repository Settings → Add topics:
- `react`
- `pizza`
- `ecommerce`
- `authentication`

### Enable GitHub Pages (Optional)
Settings → Pages → Deploy from branch → `gh-pages`

## Sharing Your Project

### Share the GitHub URL
```
https://github.com/YOUR_USERNAME/03-pizza-menu
```

### Share the Live App URL
```
https://03-pizza-menu.vercel.app
(Provided by Vercel)
```

### Share with README Badge
Add to README.md:
```markdown
[![Vercel](https://img.shields.io/badge/vercel-deployed-00C7B7)](your-app-url)
```

## Next Steps

1. ✅ Push code to GitHub
2. ✅ Deploy to Vercel
3. 📝 Add to your portfolio
4. 🎯 Ask for feedback
5. 🚀 Keep improving!

## Resources

- Git Documentation: https://git-scm.com/doc
- GitHub Guides: https://guides.github.com
- Vercel Docs: https://vercel.com/docs
- GitHub Desktop (GUI): https://desktop.github.com

---

**You're ready to share your app with the world! 🌍**
