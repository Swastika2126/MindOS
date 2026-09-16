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
import type { Task, TaskCategory, TaskPriority } from "@/lib/types/task";

export type { Task, TaskCategory, TaskPriority };

/**
 * Subscribes to the current user's tasks in real time.
 * Returns an unsubscribe function — call it in a useEffect cleanup.
 */
export function subscribeToTasks(userId: string, onChange: (tasks: Task[]) => void) {
  const q = query(collection(db, "tasks"), where("userId", "==", userId));

  return onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Task);
    onChange(tasks);
  });
}

export async function addTask(userId: string, task: Omit<Task, "id" | "completed">) {
  await addDoc(collection(db, "tasks"), {
    ...task,
    userId,
    completed: false,
    createdAt: serverTimestamp(),
  });
}

export async function toggleTask(taskId: string, completed: boolean) {
  await updateDoc(doc(db, "tasks", taskId), { completed });
}

export async function deleteTask(taskId: string) {
  await deleteDoc(doc(db, "tasks", taskId));
}