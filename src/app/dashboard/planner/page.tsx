"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles, Plus } from "lucide-react";
import TopBar from "@/components/layout/TopBar";
import Button from "@/components/ui/Button";

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const upcoming = [
  { title: "Design Critique", time: "Today, 2:00 PM" },
  { title: "Dinner with Mom", time: "Tomorrow, 7:00 PM" },
  { title: "Q3 Review Prep", time: "Sept 12, 10:00 AM" },
];

const aiSuggestions = ["Plan my day", "Prioritize tasks", "Find free time"];

export default function PlannerPage() {
  const [view, setView] = useState<"day" | "week" | "month">("month");

  return (
    <div className="h-full">
      <TopBar
        title="Planner"
        searchPlaceholder="Search events or tasks..."
      />

      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-3 md:p-8">
        {/* Calendar */}
        <div className="rounded-card border border-border bg-surface p-5 md:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button className="text-text-muted hover:text-text-primary">
                <ChevronLeft size={18} />
              </button>
              <span className="text-sm font-semibold text-text-primary">September 2024</span>
              <button className="text-text-muted hover:text-text-primary">
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="flex gap-1 rounded-card bg-input-bg p-1">
              {(["day", "week", "month"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`rounded-card px-3 py-1 text-xs font-medium capitalize ${
                    view === v ? "bg-surface text-text-primary shadow-sm" : "text-text-muted"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium text-text-muted">
            {days.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-7 gap-2">
            {Array.from({ length: 28 }).map((_, i) => (
              <div
                key={i}
                className="flex h-16 items-start justify-start rounded-card border border-border p-2 text-xs text-text-secondary"
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Side panel */}
        <div className="flex flex-col gap-6">
          <div className="rounded-card border border-border bg-surface p-5">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles size={16} className="text-accent" />
              <p className="text-sm font-semibold text-text-primary">AI Planner</p>
            </div>
            <p className="mb-3 text-xs text-text-secondary">
              What would you like to plan today?
            </p>
            <input
              type="text"
              placeholder="Ask AI..."
              className="w-full rounded-card border border-input-border bg-input-bg px-3.5 py-2 text-sm focus:outline-none focus:border-accent"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {aiSuggestions.map((s) => (
                <button
                  key={s}
                  className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-card border border-border bg-surface p-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-text-primary">Upcoming</p>
              <a href="#" className="text-xs font-medium text-accent">View All</a>
            </div>
            <div className="flex flex-col gap-3">
              {upcoming.map((event) => (
                <div key={event.title} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <div>
                    <p className="text-sm text-text-primary">{event.title}</p>
                    <p className="text-xs text-text-muted">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button className="w-auto self-start px-5">
            <Plus size={16} /> New Event
          </Button>
        </div>
      </div>
    </div>
  );
}