# Quick Local Setup Guide

## Start the Backend & Frontend (LOCAL DEVELOPMENT)

### Prerequisites
- Node.js 16+ installed
- MongoDB Atlas account (or local MongoDB running)

### Step 1: Get MongoDB Connection String

**Option A: MongoDB Atlas (Free, Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new project and cluster (takes ~5 minutes)
4. Click "Connect" on your cluster
5. Select "Drivers" and choose "Node.js"
6. Copy the connection string:
   ```
   mongodb+srv://username:password@cluster-name.mongodb.net/pizza-menu?retryWrites=true&w=majority
   ```
7. Replace `username` and `password` with your database user credentials

**Option B: Local MongoDB**
1. Install MongoDB on your machine
2. Run MongoDB service
3. Connection string: `mongodb://localhost:27017/pizza-menu`

### Step 2: Configure Backend

1. **Update `backend/.env`** with your MongoDB connection string:
   ```bash
   # Edit backend/.env
   MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/pizza-menu?retryWrites=true&w=majority
   JWT_SECRET=generate-a-random-secret-string-here
   PORT=5000
   ```

### Step 3: Run Backend (Terminal 1)

```bash
cd backend
npm run dev
```

You should see:
```
✓ Connected to MongoDB
🚀 Backend running on http://localhost:5000
```

### Step 4: Run Frontend (Terminal 2)

```bash
npm start
```

App opens at `http://localhost:3000`

### Step 5: Test the App

1. Click "Sign Up Here"
2. Enter name, email, password
3. Click "Create Account"
4. You should be logged in and see the pizza menu

If signup fails:
- Check if backend is running (Terminal 1)
- Check if MongoDB is connected (look for "✓ Connected to MongoDB")
- Check MONGODB_URI in backend/.env is correct
- Check browser console for network errors

---

## Deploy to Production (Vercel + Render)

### Deploy Backend to Render.com (Free)

1. Go to https://render.com
2. Sign in with GitHub
3. Click "New +" → "Web Service"
4. Select `boruma254/03-pizza-menu` repo
5. Settings:
   - **Root directory**: `backend`
   - **Build command**: `npm install`
   - **Start command**: `npm start`
   - **Environment variables**:
     ```
     MONGODB_URI=mongodb+srv://...your-connection-string...
     JWT_SECRET=your-strong-random-secret
     PORT=5000
     ```
6. Deploy
7. Copy the deployed URL (e.g., `https://pizza-backend-xyz.onrender.com`)

### Deploy Frontend to Vercel

1. Go to https://vercel.com
2. Sign in with GitHub
3. Import `boruma254/03-pizza-menu`
4. Settings:
   - **Root directory**: `.` (root)
   - **Environment variables**:
     ```
     REACT_APP_API_URL=https://your-deployed-backend-url/api
     ```
5. Deploy

Now your app is live! Frontend talks to backend via the API.

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Signup failed" after clicking Create Account | Start the backend server: `cd backend && npm run dev` |
| "✗ MongoDB connection error" in backend logs | Check MONGODB_URI in `backend/.env` is correct and account is whitelisted in MongoDB Atlas |
| "Failed to fetch" in browser console | Backend not running, or REACT_APP_API_URL is incorrect |
| 503 error "Database connection failed" | MongoDB is not connected. Configure MONGODB_URI in backend/.env |
| App shows but nothing works | Check that both `npm start` (frontend) and `npm run dev` (backend) are running |

