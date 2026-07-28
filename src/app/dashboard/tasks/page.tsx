"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import TopBar from "@/components/layout/TopBar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import {
  initialTasks,
  type Task,
  type TaskCategory,
  type TaskPriority,
} from "@/lib/types/task";

const priorityTone: Record<TaskPriority, TaskPriority> = {
  high: "high",
  medium: "medium",
  low: "low",
};

const categoryTone: Record<TaskCategory, TaskCategory> = {
  study: "study",
  work: "work",
  personal: "personal",
  health: "health",
};

/** Tasks live in local state for now. Persist later via Firestore + auth. */
export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("pending");
  const [newTitle, setNewTitle] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  function handleAddTask() {
    if (!newTitle.trim()) return;
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title: newTitle.trim(),
        priority: "medium",
        category: "personal",
        completed: false,
      },
    ]);
    setNewTitle("");
    setShowAddForm(false);
  }

  function toggleTask(id: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function removeTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  const filtered = tasks.filter((t) => {
    if (filter === "pending") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div>
      <TopBar
        title="Tasks"
        searchPlaceholder="Search tasks..."
        action={
          <Button className="w-auto px-5" onClick={() => setShowAddForm((s) => !s)}>
            <Plus size={16} /> Add Task
          </Button>
        }
      />

      <div className="p-6 md:p-8">
        <div className="mb-6 flex flex-wrap gap-2">
          {(["all", "pending", "completed"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-card px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                filter === f
                  ? "bg-accent text-text-onAccent"
                  : "text-text-secondary hover:bg-sidebarItemHover"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {showAddForm && (
          <div className="mb-6 flex flex-col gap-2 rounded-card border border-border bg-surface p-3 sm:flex-row">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
              placeholder="What needs to be done?"
              className="flex-1 rounded-card border border-input-border bg-input-bg px-3.5 py-2 text-sm focus:outline-none focus:border-accent"
              autoFocus
            />
            <Button className="w-auto px-5" onClick={handleAddTask}>
              Add
            </Button>
          </div>
        )}

        <div className="flex flex-col gap-2">
          {filtered.length === 0 && (
            <p className="py-12 text-center text-sm text-text-muted">
              No {filter !== "all" ? filter : ""} tasks yet.
            </p>
          )}

          {filtered.map((task) => (
            <div
              key={task.id}
              className="flex flex-col gap-3 rounded-card border border-border bg-surface px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex min-w-0 items-center gap-3">
                <button
                  onClick={() => toggleTask(task.id)}
                  aria-label={task.completed ? "Mark as pending" : "Mark as completed"}
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                    task.completed ? "border-accent bg-accent" : "border-input-border"
                  }`}
                >
                  {task.completed && (
                    <span className="h-2 w-2 rounded-full bg-text-onAccent" />
                  )}
                </button>

                <span
                  className={`truncate text-sm ${
                    task.completed ? "text-text-muted line-through" : "text-text-primary"
                  }`}
                >
                  {task.title}
                </span>

                <Badge label={task.category} tone={categoryTone[task.category]} />
              </div>

              <div className="flex items-center gap-3 pl-8 sm:pl-0">
                <Badge label={task.priority} tone={priorityTone[task.priority]} />
                <button
                  onClick={() => removeTask(task.id)}
                  aria-label="Delete task"
                  className="text-xs text-text-muted hover:text-error"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
