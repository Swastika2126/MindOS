import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { CalendarEvent } from "@/lib/types/events";

export type { CalendarEvent };

/**
 * Subscribes to the current user's events in real time.
 * Returns an unsubscribe function — call it in a useEffect cleanup.
 */
export function subscribeToEvents(
  userId: string,
  onChange: (events: CalendarEvent[]) => void
) {
  const q = query(collection(db, "events"), where("userId", "==", userId));
  return onSnapshot(q, (snapshot) => {
    const events = snapshot.docs.map(
      (d) => ({ id: d.id, ...d.data() }) as CalendarEvent
    );
    onChange(events);
  });
}

export async function addEvent(
  userId: string,
  event: Omit<CalendarEvent, "id" | "userId" | "createdAt">
) {
  await addDoc(collection(db, "events"), {
    ...event,
    userId,
    createdAt: serverTimestamp(),
  });
}

export async function updateEvent(
  eventId: string,
  updates: Partial<Omit<CalendarEvent, "id" | "userId" | "createdAt">>
) {
  await updateDoc(doc(db, "events", eventId), updates);
}

export async function deleteEvent(eventId: string) {
  await deleteDoc(doc(db, "events", eventId));
}