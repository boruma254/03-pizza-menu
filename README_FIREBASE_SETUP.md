# Firebase setup for Fast React Pizza Co.

Follow these steps to configure Firebase, enable Authentication providers, and wire environment variables for local and production deployments.

1) Create a Firebase project
   - Go to https://console.firebase.google.com and create a new project.

2) Add a Web App to the project
   - In Project Overview click the gear > Project settings > General.
   - Add a new Web App and copy the configuration values.

3) Add environment variables (local)
   - Create a file named `.env.local` in the project root (this file is not committed):

```
REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-firebase-app-id
```

4) Enable Auth providers
   - In the Firebase console go to Authentication → Sign-in method.
   - Enable Email/Password and Google sign-in.
   - For Phone sign-in you must set up the phone provider. Note: phone auth requires reCAPTCHA in web apps.

5) Firestore
   - In Firebase console go to Firestore Database and create a database in production or test mode.
   - Collections used by the app: `profiles` and `orders` (no strict schema required for demo).

6) Test the app locally
   - Install dependencies: `npm install`
   - Start dev server: `npm start`
   - Open `http://localhost:3000` and try Sign Up / Sign In flows.

7) Deploy
   - Add the same environment variables to Vercel (or your hosting) before deploying.

Notes
   - The app uses the Firebase client SDK and writes profile documents to `profiles` and order documents to `orders`.
   - Keep your Firebase API key and config out of version control (use environment variables).
