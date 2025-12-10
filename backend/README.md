# Backend Setup & Deployment Guide

## Local Development

### Prerequisites
- Node.js 16+ installed
- MongoDB (local or MongoDB Atlas account)

### Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file** (copy from `.env.example`)
   ```bash
   cp .env.example .env
   ```

4. **Configure `.env`**
   - For **MongoDB Atlas** (recommended):
     1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
     2. Create a free account & cluster
     3. Create a database user (username & password)
     4. Whitelist your IP (or allow 0.0.0.0 for all)
     5. Copy the connection string and replace `username`, `password`, and `cluster`
     6. Paste into `MONGODB_URI` in `.env`
   - Set `JWT_SECRET` to a strong random string (e.g., `openssl rand -hex 32`)
   - Set `PORT` to `5000` (or any available port)

5. **Start development server**
   ```bash
   npm run dev
   ```

   You should see:
   ```
   ✓ Connected to MongoDB
   🚀 Backend running on http://localhost:5000
   ```

6. **Test the API**
   ```bash
   curl http://localhost:5000/api/health
   ```

---

## Deployment (Render.com - Free)

### Steps

1. **Push code to GitHub** (already done)

2. **Create Render.com account**
   - Go to [Render.com](https://render.com)
   - Sign up with GitHub (easier)

3. **Create a new Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repo (`boruma254/03-pizza-menu`)
   - Select `backend` as the root directory
   - Build command: `npm install`
   - Start command: `npm start`
   - Environment variables:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: A strong random string
     - `PORT`: Leave blank (Render sets it automatically)

4. **Deploy**
   - Render auto-deploys on push to `main` (or your branch)
   - Copy the deployed URL (e.g., `https://pizza-backend-xyz.onrender.com`)

5. **Update frontend** (see below)

---

## Alternative Deployment Options

### Heroku (requires credit card)
```bash
# Create Heroku app
heroku create pizza-menu-backend

# Add MongoDB URI env var
heroku config:set MONGODB_URI="your-connection-string"

# Deploy
git push heroku main
```

### Railway.app
- Similar to Render, supports MongoDB addon
- Free tier: $5/month credit

### Vercel (with serverless function)
- Can convert `server.js` to serverless functions
- Requires restructuring code

---

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/signin` - Login
- `GET /api/auth/me` - Get current user (requires token)

### Orders
- `POST /api/orders` - Create order (requires token)
- `GET /api/orders` - Get user's orders (requires token)
- `GET /api/orders/:id` - Get single order (requires token)
- `PATCH /api/orders/:id/status` - Update order status (requires token)
- `GET /api/orders/admin/all` - Get all orders (admin, requires token)

### Health Check
- `GET /api/health` - Server status

---

## Next Steps

After deploying the backend:

1. **Update frontend `.env.local`**
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com
   ```

2. **Update `src/apiClient.js`** (provided in frontend setup)

3. **Redeploy frontend** to Vercel with new env var

---

## Troubleshooting

### "Cannot connect to MongoDB"
- Check connection string format
- Whitelist your IP in MongoDB Atlas
- Test connection: `mongo "mongodb+srv://..."`

### "JWT token invalid"
- Make sure `JWT_SECRET` matches on backend
- Check token expiration (7 days)

### CORS errors
- Backend `cors()` should allow any origin (configured)
- If still blocked, check browser console for exact error

### Port already in use
- Change `PORT` in `.env` to another port (e.g., 5001)
