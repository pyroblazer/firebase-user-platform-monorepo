import * as admin from "firebase-admin";

const firebaseConfig = {
  apiKey: process.env.ENV_FIREBASE_API_KEY!,
  authDomain: process.env.ENV_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.ENV_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.ENV_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.ENV_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.ENV_FIREBASE_APP_ID!,
  measurementId: process.env.ENV_FIREBASE_MEASUREMENT_ID!
};


admin.initializeApp(firebaseConfig);

const db = admin.firestore();

export { admin, db };
