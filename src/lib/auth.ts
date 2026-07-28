/**
 * Auth seam for MindOS. UI is not wired yet — implement these against
 * Firebase Auth (see lib/firebase.ts) when connecting sign-in.
 */

export async function signInWithEmail(email: string, password: string): Promise<void> {
  void email;
  void password;
  throw new Error("TODO: implement signInWithEmail with Firebase Auth");
}

export async function signInWithGoogle(): Promise<void> {
  throw new Error("TODO: implement signInWithGoogle with Firebase Auth");
}

export async function signOut(): Promise<void> {
  throw new Error("TODO: implement signOut with Firebase Auth");
}
