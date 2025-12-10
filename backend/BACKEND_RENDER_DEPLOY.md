# Deploying the backend to Render

This document explains how to deploy the `backend` service of this project to Render.com.

Prerequisites
- A GitHub repository with this code (connected to Render)
- A MongoDB Atlas cluster or other MongoDB instance and its connection string
- A Render account

Quick steps
1. Create a MongoDB Atlas cluster (or use an existing one).
   - Create a database user and allow access from Render (you can allow access from anywhere or set the IP rules appropriately).
   - Copy the connection string (it looks like `mongodb+srv://<user>:<password>@cluster0.xyz.mongodb.net/mydb?retryWrites=true&w=majority`).

2. Connect your GitHub repo to Render
   - In Render dashboard click **New** → **Web Service** → **Connect a repository** and select this repository.

3. Configure the service
   - In **Branch** choose `main` (or whichever branch you deploy from).
   - **Root directory**: leave blank (manifest will run `cd backend`).
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - Node environment is detected automatically; if needed set `Environment` to `Node`.

4. Add environment variables (in Render service settings → Environment)
   - `MONGODB_URI` = your Atlas connection string (keep this secret)
   - `JWT_SECRET` = a long random string used to sign tokens (keep this secret)
   - Optionally set `PORT` (Render sets it automatically, but the server reads `process.env.PORT` already).

5. Deploy and test
   - Trigger a manual deploy from the Render UI (or push to `main` if auto-deploy is enabled).
   - After deployment, open `<your-service>.onrender.com/api/health` which should return JSON `{ status: 'API is running' }`.

Notes and tips
- The `render.yaml` manifest in the repo will help create the service with the default build/start commands. You can still configure more options in the Render UI.
- Do NOT commit secrets into the repo. Use Render's Environment settings or Render Secrets to store `MONGODB_URI` and `JWT_SECRET`.
- After the backend is deployed, update the frontend's `REACT_APP_API_URL` (in Vercel or local `.env`) to point to `https://<your-service>.onrender.com/api`.

If you want, I can:
- create the `render.yaml` manifest (already added) and the short instructions (this file),
- prepare a sample `render` service configuration with placeholders, or
- generate a step-by-step terminal-friendly checklist you can follow now.
