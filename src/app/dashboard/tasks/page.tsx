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

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("pending");
  const [search, setSearch] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newPriority, setNewPriority] = useState<TaskPriority>("medium");
  const [newCategory, setNewCategory] = useState<TaskCategory>("personal");
  const [showAddForm, setShowAddForm] = useState(false);

  function handleAddTask() {
    if (!newTitle.trim()) return;

    setTasks((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title: newTitle.trim(),
        priority: newPriority,
        category: newCategory,
        completed: false,
      },
    ]);

    setNewTitle("");
    setNewPriority("medium");
    setNewCategory("personal");
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
    const matchesFilter =
      filter === "all"
        ? true
        : filter === "pending"
        ? !t.completed
        : t.completed;

    const searchText = search.trim().toLowerCase();

    const matchesSearch =
      !searchText ||
      t.title.toLowerCase().includes(searchText) ||
      t.category.toLowerCase().includes(searchText) ||
      t.priority.toLowerCase().includes(searchText);

    return matchesFilter && matchesSearch;
  });

  return (
    <div>
      <TopBar
        title="Tasks"
        searchPlaceholder="Search tasks..."
        searchValue={search}
        onSearchChange={setSearch}
        action={
          <Button
            className="w-auto px-5"
            onClick={() => setShowAddForm((s) => !s)}
          >
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
          <div className="mb-6 flex flex-col gap-3 rounded-card border border-border bg-surface p-3">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
              placeholder="What needs to be done?"
              className="rounded-card border border-input-border bg-input-bg px-3.5 py-2 text-sm focus:border-accent focus:outline-none"
              autoFocus
            />

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <select
                value={newPriority}
                onChange={(e) =>
                  setNewPriority(e.target.value as TaskPriority)
                }
                className="rounded-card border border-input-border bg-input-bg px-3.5 py-2 text-sm focus:border-accent focus:outline-none"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>

              <select
                value={newCategory}
                onChange={(e) =>
                  setNewCategory(e.target.value as TaskCategory)
                }
                className="rounded-card border border-input-border bg-input-bg px-3.5 py-2 text-sm focus:border-accent focus:outline-none"
              >
                <option value="study">Study</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="health">Health</option>
              </select>
            </div>

            <Button
              className="w-auto self-start px-5"
              onClick={handleAddTask}
            >
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
                  aria-label={
                    task.completed
                      ? "Mark as pending"
                      : "Mark as completed"
                  }
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                    task.completed
                      ? "border-accent bg-accent"
                      : "border-input-border"
                  }`}
                >
                  {task.completed && (
                    <span className="h-2 w-2 rounded-full bg-text-onAccent" />
                  )}
                </button>

                <span
                  className={`truncate text-sm ${
                    task.completed
                      ? "text-text-muted line-through"
                      : "text-text-primary"
                  }`}
                >
                  {task.title}
                </span>

                <Badge
                  label={task.category}
                  tone={categoryTone[task.category]}
                />
              </div>

              <div className="flex items-center gap-3 pl-8 sm:pl-0">
                <Badge
                  label={task.priority}
                  tone={priorityTone[task.priority]}
                />

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