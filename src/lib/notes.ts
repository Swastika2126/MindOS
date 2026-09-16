import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Note } from "@/lib/types/note";

export function subscribeToNotes(
  userId: string,
  onChange: (notes: Note[]) => void
) {
  const q = query(
    collection(db, "notes"),
    where("userId", "==", userId),
    orderBy("updatedAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const notes = snapshot.docs.map(
      (document) =>
        ({
          id: document.id,
          ...document.data(),
        }) as Note
    );

    onChange(notes);
  });
}

export async function addNote(
  userId: string,
  note: Omit<Note, "id" | "userId" | "createdAt" | "updatedAt">
) {
  await addDoc(collection(db, "notes"), {
    ...note,
    userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateNote(
  noteId: string,
  updates: Partial<Omit<Note, "id" | "userId" | "createdAt">>
) {
  await updateDoc(doc(db, "notes", noteId), {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteNote(noteId: string) {
  await deleteDoc(doc(db, "notes", noteId));
}