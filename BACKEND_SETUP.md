# Full-Stack Pizza Ordering App Setup Guide

## Overview

Your app now has:
- **Frontend:** React (Vercel deployment ready)
- **Backend:** Node.js/Express API (MongoDB + JWT auth)
- **Database:** MongoDB (MongoDB Atlas for cloud hosting)

No clients need to configure anything locally — the app works entirely through the API.

---

## Quick Start (Local Development)

### Prerequisites
- Node.js 16+ installed on your machine
- MongoDB Atlas account (free tier available)

### Step 1: Set up MongoDB Atlas (free)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up (free tier available)
3. Create a cluster (takes ~10 minutes)
4. Create a database user:
   - Username: `pizza_user`
   - Password: generate a strong password
5. Add your IP to whitelist (or allow 0.0.0.0 for all)
6. Copy connection string: `mongodb+srv://pizza_user:PASSWORD@cluster.mongodb.net/pizza-menu?retryWrites=true&w=majority`

### Step 2: Start Backend Server

```bash
# Navigate to backend directory
cd backend

# Create .env file and add your MongoDB connection
cp .env.example .env

# Edit .env and add:
# MONGODB_URI=mongodb+srv://pizza_user:YOUR_PASSWORD@cluster.mongodb.net/pizza-menu?retryWrites=true&w=majority
# JWT_SECRET=your-strong-secret-key (generate: openssl rand -hex 32)

# Install dependencies
npm install

# Start development server
npm run dev
```

You should see:
```
✓ Connected to MongoDB
🚀 Backend running on http://localhost:5000
```

### Step 3: Start Frontend (new terminal)

```bash
# Navigate to frontend directory
cd ..

# Install dependencies (if not already done)
npm install

# Start dev server
npm start
```

Frontend will open at `http://localhost:3000`

### Step 4: Test Auth Flow

1. Visit `http://localhost:3000`
2. Click "Sign Up Here"
3. Create account with email/password
4. Sign in
5. Add pizzas to cart and place order
6. View order history

---

## Deployment (Production)

### Deploy Backend to Render.com (Free)

1. **Login to [Render.com](https://render.com)** with GitHub

2. **Create Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repo: `boruma254/03-pizza-menu`
   - Root directory

   - Build command: `cd backend && npm install`
   - Start command: `cd backend && npm start`
   - Environment variables:
     ```
     MONGODB_URI=mongodb+srv://pizza_user:PASSWORD@cluster.mongodb.net/pizza-menu?retryWrites=true&w=majority
     JWT_SECRET=your-super-secret-string
     PORT=5000
     ```

3. **Deploy** — Render will auto-deploy on `git push`

4. **Copy backend URL** (e.g., `https://pizza-backend-xyz.onrender.com`)

### Deploy Frontend to Vercel

1. **Login to [Vercel](https://vercel.com)** with GitHub

2. **Import Project:**
   - Select `boruma254/03-pizza-menu` repository
   - Framework: Create React App
   - Root directory: `.` (root)

3. **Environment Variables:**
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com/api
   ```

4. **Deploy** — Vercel auto-deploys on `git push`

---

## API Endpoints

### Auth Routes

#### Sign Up
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123","name":"John Doe"}'
```

Response:
```json
{
  "message": "User created successfully",
  "user": { "id": "...", "email": "user@example.com", "name": "John Doe" },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Sign In
```bash
curl -X POST http://localhost:5000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

#### Get Current User
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Order Routes

#### Create Order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {"name": "Pizza Spinaci", "price": 10, "photoName": "pizzas/spinaci.jpg"}
    ],
    "total": 10
  }'
```

#### Get User Orders
```bash
curl -X GET http://localhost:5000/api/orders \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Get All Orders (Admin)
```bash
curl -X GET http://localhost:5000/api/orders/admin/all \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Update Order Status
```bash
curl -X PATCH http://localhost:5000/api/orders/ORDER_ID/status \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status": 1}'
```

---

## File Structure

```
03-pizza-menu/
├── backend/
│   ├── server.js                 # Main Express server
│   ├── package.json
│   ├── .env.example
│   ├── routes/
│   │   ├── auth.js              # Auth endpoints
│   │   └── orders.js            # Order endpoints
│   ├── models/
│   │   ├── User.js              # MongoDB User schema
│   │   └── Order.js             # MongoDB Order schema
│   └── middleware/
│       └── auth.js              # JWT middleware
│
├── src/
│   ├── index.js                 # Main React app
│   ├── apiClient.js             # API helper functions
│   ├── AdminPage.js             # Admin dashboard
│   ├── components/
│   │   ├── Notification.js
│   │   └── Loader.js
│   └── ...
│
├── .env.local                   # Frontend env vars
└── .env.example
```

---

## Security Notes

1. **Never commit `.env` files** — `.gitignore` already excludes them
2. **JWT Secret:** Use a strong random string (minimum 32 characters)
3. **MongoDB Atlas:** Whitelist only necessary IPs
4. **CORS:** Backend allows requests from any origin (update in production)
5. **Password Hashing:** Uses bcryptjs with salt rounds

---

## Troubleshooting

### Backend won't connect to MongoDB
- Check connection string format in `.env`
- Ensure IP is whitelisted in MongoDB Atlas
- Test: `mongo "your-connection-string"`

### Frontend can't reach backend
- Check `REACT_APP_API_URL` in `.env.local`
- Ensure backend is running (`npm run dev` in backend folder)
- Check CORS errors in browser console

### Port already in use
- Change `PORT` in backend `.env` (e.g., 5001)
- Frontend dev server can use a different port if needed

### Token invalid errors
- Ensure `JWT_SECRET` matches on backend
- Tokens expire after 7 days — user will need to sign in again

---

## Future Enhancements

- [ ] Phone OTP authentication (Firebase or Twilio)
- [ ] Google/Facebook OAuth
- [ ] Email verification on signup
- [ ] Order notifications (email/SMS)
- [ ] Payment integration (Stripe/PayPal)
- [ ] Admin dashboard with role-based access
- [ ] Real-time order updates (WebSocket)

---

## Support

For issues:
1. Check backend logs: `npm run dev` output
2. Check browser console for frontend errors
3. Verify `.env` files have correct values
4. Review MongoDB Atlas connection logs
