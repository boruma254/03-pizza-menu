# Quick Start Guide

Get your pizza ordering app up and running in minutes!

## For Development (Local Testing)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm start
```

Your app opens at **http://localhost:3000**

### 3. Test with Demo Accounts

| Email | Password |
|-------|----------|
| john@example.com | password123 |
| jane@example.com | password123 |
| demo@example.com | demo123 |

Or sign up with your own account!

## For Production (Deployment)

### 1. Build the App
```bash
npm run build
```

Creates optimized `build` folder ready for deployment.

### 2. Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Pizza ordering app"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/03-pizza-menu.git

# Push
git branch -M main
git push -u origin main
```

### 3. Deploy to Vercel (Easiest)

1. Visit [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Select `03-pizza-menu` repository
5. Click "Deploy"
6. Done! 🎉

**Your app is live!** Vercel provides a URL instantly.

### 4. Verify Deployment

- [ ] App loads without errors
- [ ] Login/signup works
- [ ] Cart functionality works
- [ ] Order tracking works
- [ ] Images load correctly

## Common Tasks

### Update Code After Deployment
```bash
git add .
git commit -m "Describe your changes"
git push origin main
# Vercel auto-deploys!
```

### View Build Folder
```bash
npm run build
# Then explore build/ folder
```

### Test Production Build Locally
```bash
npm run build
npm run serve
# Opens at http://localhost:3000
```

### Create New Account
1. Go to app
2. Click "Sign Up Here"
3. Fill form
4. Account created and logged in!

## Important Files Before Deployment

Update these files before pushing to GitHub:

1. **package.json**
   - Change repository URL
   - Update author name
   - Set homepage URL

2. **README.md**
   - Update installation URLs
   - Add your username
   - Update author info

3. **.env.example** (if using)
   - Add any needed variables
   - Don't include actual values

## Troubleshooting

### App Won't Start
```bash
# Delete node_modules and reinstall
rm -r node_modules
npm install
npm start
```

### Build Fails
- Check for syntax errors in code
- Ensure all imports exist
- Run `npm install` to update dependencies

### Images Not Loading
- Ensure images are in `public/pizzas/`
- Check image paths in `src/data.js`
- Refresh browser (Ctrl+F5)

### Deployment Issues
- Check console for errors (F12)
- Verify build succeeded locally
- Check Vercel/Netlify logs

## Next Steps

1. ✅ **Test locally** (`npm start`)
2. ✅ **Build for production** (`npm run build`)
3. ✅ **Push to GitHub**
4. ✅ **Deploy to Vercel/Netlify**
5. 📱 **Share your app!**

## Demo Features to Test

### Sign Up Flow
1. Click "Sign Up Here"
2. Enter name, email, password
3. Account created automatically

### Ordering Flow
1. Browse pizzas
2. Click "Add to Cart"
3. View cart count in header
4. Click "Place Order"
5. See confirmation

### Tracking Flow
1. Click "📦 Order History"
2. See your orders
3. Click "Advance Order Status" to demo
4. See status progression

## File Size Reference

After build:
- JavaScript: ~49.4 kB (gzipped)
- CSS: ~2.1 kB (gzipped)
- Total: ~51.5 kB

Excellent for fast loading!

## Pro Tips

✨ **Smart Tips for Success**

- Always test before pushing
- Write descriptive commit messages
- Use GitHub issues for bugs
- Create branches for new features
- Keep dependencies updated
- Monitor deployment logs

## Questions?

Check these files:
- `README.md` - Full documentation
- `DEPLOYMENT.md` - Deployment details
- `PROJECT_STRUCTURE.md` - Code organization
- `CONTRIBUTING.md` - Development guidelines

---

**You're all set! 🍕🚀**

Need help? Open an issue on GitHub!
