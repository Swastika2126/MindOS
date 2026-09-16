import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";

import { auth } from "./firebase";

const googleProvider = new GoogleAuthProvider();

export async function signInWithEmail(
  email: string,
  password: string
) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function signInWithGoogle() {
  return await signInWithPopup(auth, googleProvider);
}

export async function signOut() {
  return await firebaseSignOut(auth);
}
export function subscribeToAuthState(
  callback: (user: User | null) => void
) {
  return onAuthStateChanged(auth, callback);
}
