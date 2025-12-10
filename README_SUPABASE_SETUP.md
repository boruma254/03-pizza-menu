# Supabase setup for Fast React Pizza Co.

Follow these steps to configure Supabase, create the required tables, and wire environment variables for local and production deployments.

1) Create a Supabase project
   - Go to https://app.supabase.com and create a new project.
   - Note the project `URL` and `anon` public key.

2) Add environment variables (local)
   - Create a file named `.env.local` in the project root (this file is not committed):

```
REACT_APP_SUPABASE_URL=https://your-project-ref.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-public-key
```

3) Add environment variables (production)
   - Add the same two variables in your Vercel (or chosen host) project settings.
   - Vercel example keys: `REACT_APP_SUPABASE_URL`, `REACT_APP_SUPABASE_ANON_KEY`.

4) Create required database tables
   - Open the Supabase project → SQL Editor and run the migration SQL file at `db/migrations/001_create_profiles_and_orders.sql` (copy/paste contents or upload it).

5) Configure Auth providers
   - Email: enabled by default.
   - Phone (SMS OTP): configure an SMS provider (e.g., Twilio) in Supabase dashboard → Auth → Settings → SMS. Without an SMS provider, phone OTPs will not be delivered.
   - Google OAuth: configure the Google provider in Supabase → Auth → Providers. Add the OAuth credentials and set Redirect URLs to:
     - `http://localhost:3000` (for local dev)
     - `https://<your-production-domain>` (for Vercel)

6) Test the app locally
   - Install dependencies: `npm install`
   - Start dev server: `npm start`
   - Open `http://localhost:3000` and try Sign Up / Sign In flows.

7) Notes & troubleshooting
   - Make sure `.env.local` is present with the correct keys before running the app.
   - Check browser console/network logs for Supabase auth errors.
   - If OTPs don't arrive, confirm SMS provider credentials and phone number format.

If you'd like, I can also add a migration script or a CI workflow to run DB migrations automatically.
