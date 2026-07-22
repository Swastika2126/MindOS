"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import TopBar from "@/components/layout/TopBar";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";

interface Goal {
  id: string;
  title: string;
  target: string;
  progress: number;
  focusItems: { label: string; done: boolean }[];
}

const initialGoals: Goal[] = [
  {
    id: "1",
    title: "Get SDE Internship",
    target: "Dec 2026",
    progress: 45,
    focusItems: [
      { label: "DSA Arrays & Linked Lists", done: true },
      { label: "Resume review with mentor", done: false },
      { label: "Apply to 3 companies", done: false },
    ],
  },
  {
    id: "2",
    title: "Launch Portfolio Website",
    target: "Aug 2026",
    progress: 70,
    focusItems: [
      { label: "Finish projects section grid", done: true },
      { label: "Write \"About Me\" page", done: true },
      { label: "Deploy to production", done: false },
    ],
  },
];

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);

  function toggleFocusItem(goalId: string, index: number) {
    setGoals((prev) =>
      prev.map((g) =>
        g.id === goalId
          ? {
              ...g,
              focusItems: g.focusItems.map((item, i) =>
                i === index ? { ...item, done: !item.done } : item
              ),
            }
          : g
      )
    );
  }

  return (
    <div>
      <TopBar
        title="Goals"
        searchPlaceholder="Search goals..."

        action={
          <Button className="w-auto px-5">
            <Plus size={16} /> Add Goal
          </Button>
        }
      />

      <div className="p-8">
        <h2 className="font-serif text-xl text-text-primary">My Strategic Intentions</h2>
        <p className="mt-1 max-w-xl text-sm text-text-secondary">
          Visualize your long-term aspirations. Break them down, track your momentum, and find
          clarity in progress.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-5">
          {goals.map((goal) => (
            <div key={goal.id} className="rounded-card border border-border bg-surface p-5">
              <div className="flex items-start justify-between">
                <p className="font-serif text-lg text-text-primary">{goal.title}</p>
                <span className="text-xs text-text-muted">Target: {goal.target}</span>
              </div>

              <div className="mt-4">
                <ProgressBar value={goal.progress} label="Progress" />
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-text-muted">
                This week&apos;s focus
              </p>
              <div className="mt-2 flex flex-col gap-2">
                {goal.focusItems.map((item, i) => (
                  <label key={item.label} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={item.done}
                      onChange={() => toggleFocusItem(goal.id, i)}
                      className="h-4 w-4 accent-[var(--color-accent)]"
                    />
                    <span className={item.done ? "text-text-muted line-through" : "text-text-secondary"}>
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <button className="rounded-card bg-accent-soft px-3 py-1.5 text-xs font-medium text-accent">
                  AI Breakdown
                </button>
                <a href="#" className="text-xs font-medium text-accent">View All Tasks →</a>
              </div>
            </div>
          ))}

          <button className="flex flex-col items-center justify-center gap-2 rounded-card border-2 border-dashed border-border p-5 text-text-muted hover:border-accent hover:text-accent">
            <Plus size={24} />
            <span className="text-sm font-medium">Add your first goal</span>
          </button>
        </div>
      </div>
    </div>
  );
}