export type TaskPriority = "high" | "medium" | "low";
export type TaskCategory = "study" | "work" | "personal" | "health";

export interface Task {
  id: string;
  title: string;
  priority: TaskPriority;
  category: TaskCategory;
  completed: boolean;
}

/** Seed data for the local-only Tasks screen. */
export const initialTasks: Task[] = [
  { id: "1", title: "DBMS Assignment", priority: "high", category: "study", completed: false },
  { id: "2", title: "Internship Weekly Report", priority: "high", category: "work", completed: false },
  { id: "3", title: "DAA Revision Chapter 4", priority: "medium", category: "study", completed: false },
  { id: "4", title: "Resume Update", priority: "medium", category: "work", completed: true },
  { id: "5", title: "Buy stationery", priority: "low", category: "personal", completed: false },
];
