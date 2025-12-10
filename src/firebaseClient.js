import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { getFirestore, doc, setDoc, collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";

const firebaseConfig = (() => {
  const key = process.env.REACT_APP_FIREBASE_API_KEY;
  if (!key) return null;
  return {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
  };
})();

let app = null;
let auth = null;
let db = null;
let confirmationResult = null;

const firebaseConfigured = !!firebaseConfig;

if (firebaseConfigured) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
}

async function upsertProfile(user) {
  if (!db || !user) return;
  try {
    const profileRef = doc(db, "profiles", user.uid);
    await setDoc(profileRef, {
      full_name: user.displayName || user.email || null,
      email: user.email || null,
      avatar_url: user.photoURL || null,
      created_at: new Date().toISOString(),
    }, { merge: true });
  } catch (err) {
    console.warn("upsertProfile error", err);
  }
}

async function saveOrderToFirestore(user, order) {
  if (!db || !order) return;
  try {
    const ordersCol = collection(db, "orders");
    await addDoc(ordersCol, {
      id: order.id,
      user_id: user?.id || user?.uid || null,
      email: user?.email || null,
      order_data: order.items || [],
      total: order.total || 0,
      status: order.currentStatus || 0,
      created_at: new Date().toISOString(),
    });
  } catch (err) {
    console.warn("saveOrderToFirestore error", err);
    throw err;
  }
}

// Fetch profiles (basic list)
async function fetchProfiles(limit = 100) {
  if (!db) return [];
  try {
    const q = query(collection(db, 'profiles'), orderBy('created_at', 'desc'));
    const snap = await getDocs(q);
    const items = [];
    snap.forEach(docSnap => items.push({ id: docSnap.id, ...docSnap.data() }));
    return items.slice(0, limit);
  } catch (err) {
    console.warn('fetchProfiles error', err);
    return [];
  }
}

// Fetch orders (basic list)
async function fetchOrders(limit = 200) {
  if (!db) return [];
  try {
    const q = query(collection(db, 'orders'), orderBy('created_at', 'desc'));
    const snap = await getDocs(q);
    const items = [];
    snap.forEach(docSnap => items.push({ id: docSnap.id, ...docSnap.data() }));
    return items.slice(0, limit);
  } catch (err) {
    console.warn('fetchOrders error', err);
    return [];
  }
}

async function signUpWithEmail(email, password, displayName) {
  if (!auth) throw new Error("Firebase not configured");
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  // update displayName via profile upsert in app
  return cred.user;
}

async function signInWithEmail(email, password) {
  if (!auth) throw new Error("Firebase not configured");
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

async function signInWithGoogle() {
  if (!auth) throw new Error("Firebase not configured");
  const provider = new GoogleAuthProvider();
  // use popup; in some hosts redirect may be preferred
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

async function signOutFirebase() {
  if (!auth) return;
  try {
    await signOut(auth);
  } catch (err) {
    console.warn("signOut error", err);
  }
}

function listenAuthState(cb) {
  if (!auth) return () => {};
  return onAuthStateChanged(auth, cb);
}

// Phone auth helpers: sets up invisible reCAPTCHA and sends code
async function sendPhoneOtp(phoneNumber) {
  if (!auth) throw new Error("Firebase not configured");
  // create a div if needed
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', { size: 'invisible' }, auth);
  }
  try {
    confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
    return { ok: true };
  } catch (err) {
    console.warn('sendPhoneOtp error', err);
    return { ok: false, error: err };
  }
}

async function verifyPhoneOtp(code) {
  if (!confirmationResult) throw new Error('No confirmation result available');
  const result = await confirmationResult.confirm(code);
  return result.user;
}

export {
  firebaseConfigured,
  auth,
  db,
  upsertProfile,
  saveOrderToFirestore,
  signUpWithEmail,
  signInWithEmail,
  signInWithGoogle,
  signOutFirebase,
  listenAuthState,
  sendPhoneOtp,
  verifyPhoneOtp,
  fetchProfiles,
  fetchOrders,
};
