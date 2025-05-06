import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { FIREBASE_CONFIG } from '../../constants/config';

const app = initializeApp(FIREBASE_CONFIG);
const auth = getAuth(app);

export const getFirebaseAuth = () => auth;
export const firebaseSignUp = (email: string, password: string) => 
    createUserWithEmailAndPassword(auth, email, password);
export const firebaseSignIn = (email: string, password: string) => 
  signInWithEmailAndPassword(auth, email, password);
export const firebaseSignOut = () => signOut(auth);