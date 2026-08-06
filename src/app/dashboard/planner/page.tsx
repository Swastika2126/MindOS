"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles, Plus, X } from "lucide-react";
import TopBar from "@/components/layout/TopBar";
import Button from "@/components/ui/Button";
import { subscribeToAuthState } from "@/lib/auth";
import { subscribeToEvents, addEvent, type CalendarEvent } from "@/lib/events";

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const aiSuggestions = ["Plan my day", "Prioritize tasks", "Find free time"];

function toDateKey(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** "14:30" -> "2:30 PM" */
function formatTime(time?: string) {
  if (!time) return "";
  const [hStr, mStr] = time.split(":");
  const h = parseInt(hStr, 10);
  const period = h >= 12 ? "PM" : "AM";
  const displayHour = h % 12 === 0 ? 12 : h % 12;
  return `${displayHour}:${mStr} ${period}`;
}

function formatUpcomingLabel(event: CalendarEvent) {
  const today = new Date();
  const todayKey = toDateKey(today);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowKey = toDateKey(tomorrow);

  const timeLabel = formatTime(event.time);

  if (event.date === todayKey) return `Today${timeLabel ? `, ${timeLabel}` : ""}`;
  if (event.date === tomorrowKey) return `Tomorrow${timeLabel ? `, ${timeLabel}` : ""}`;

  const [y, m, d] = event.date.split("-").map(Number);
  const dateObj = new Date(y, m - 1, d);
  const dateLabel = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `${dateLabel}${timeLabel ? `, ${timeLabel}` : ""}`;
}

export default function PlannerPage() {
  const [view, setView] = useState<"day" | "week" | "month">("month");
  const [userId, setUserId] = useState<string | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState(toDateKey(new Date()));
  const [newTime, setNewTime] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToAuthState((user) => {
      setUserId(user?.uid ?? null);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!userId) {
      setEvents([]);
      return;
    }
    const unsubscribe = subscribeToEvents(userId, setEvents);
    return unsubscribe;
  }, [userId]);

  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const event of events) {
      const list = map.get(event.date) ?? [];
      list.push(event);
      map.set(event.date, list);
    }
    for (const list of map.values()) {
      list.sort((a, b) => (a.time ?? "").localeCompare(b.time ?? ""));
    }
    return map;
  }, [events]);

  const upcoming = useMemo(() => {
    const now = new Date();
    const todayKey = toDateKey(now);
    const nowMinutes = now.getHours() * 60 + now.getMinutes();

    return events
      .filter((e) => {
        if (e.date > todayKey) return true;
        if (e.date < todayKey) return false;
        // today: only show events that haven't passed yet (undated time always shows)
        if (!e.time) return true;
        const [h, m] = e.time.split(":").map(Number);
        return h * 60 + m >= nowMinutes;
      })
      .sort((a, b) => {
        if (a.date !== b.date) return a.date < b.date ? -1 : 1;
        return (a.time ?? "").localeCompare(b.time ?? "");
      })
      .slice(0, 3);
  }, [events]);

  const calendarCells = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const leadingBlanks = firstOfMonth.getDay(); // 0 = Sunday

    const cells: Array<{ day: number; dateKey: string } | null> = [];
    for (let i = 0; i < leadingBlanks; i++) cells.push(null);
    for (let day = 1; day <= daysInMonth; day++) {
      cells.push({ day, dateKey: toDateKey(new Date(year, month, day)) });
    }
    return cells;
  }, [currentMonth]);

  const monthLabel = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  function goToPrevMonth() {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }

  function goToNextMonth() {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }

  async function handleCreateEvent(e: React.FormEvent) {
    e.preventDefault();
    if (!userId || !newTitle.trim() || !newDate) return;

    setSaving(true);
    try {
      await addEvent(userId, {
        title: newTitle.trim(),
        date: newDate,
        time: newTime || undefined,
      });
      setNewTitle("");
      setNewTime("");
      setShowModal(false);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="h-full">
      <TopBar title="Planner" searchPlaceholder="Search events or tasks..." />

      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-3 md:p-8">
        {/* Calendar */}
        <div className="rounded-card border border-border bg-surface p-5 md:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={goToPrevMonth}
                className="text-text-muted hover:text-text-primary"
                aria-label="Previous month"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="text-sm font-semibold text-text-primary">{monthLabel}</span>
              <button
                onClick={goToNextMonth}
                className="text-text-muted hover:text-text-primary"
                aria-label="Next month"
              >
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
            {calendarCells.map((cell, i) => {
              if (!cell) return <div key={`blank-${i}`} />;
              const dayEvents = eventsByDate.get(cell.dateKey) ?? [];
              const isToday = cell.dateKey === toDateKey(new Date());

              return (
                <div
                  key={cell.dateKey}
                  className={`flex h-16 flex-col items-start justify-start gap-1 overflow-hidden rounded-card border p-2 text-xs ${
                    isToday ? "border-accent" : "border-border"
                  } text-text-secondary`}
                >
                  <span className={isToday ? "font-semibold text-accent" : ""}>{cell.day}</span>
                  {dayEvents.slice(0, 2).map((ev) => (
                    <span
                      key={ev.id}
                      className="w-full truncate rounded bg-accent-soft px-1 text-[10px] text-accent"
                      title={ev.title}
                    >
                      {ev.title}
                    </span>
                  ))}
                  {dayEvents.length > 2 && (
                    <span className="text-[10px] text-text-muted">+{dayEvents.length - 2} more</span>
                  )}
                </div>
              );
            })}
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
              {upcoming.length === 0 && (
                <p className="text-xs text-text-muted">No upcoming events yet.</p>
              )}
              {upcoming.map((event) => (
                <div key={event.id} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <div>
                    <p className="text-sm text-text-primary">{event.title}</p>
                    <p className="text-xs text-text-muted">{formatUpcomingLabel(event)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            className="w-auto self-start px-5"
            onClick={() => setShowModal(true)}
            disabled={!userId}
          >
            <Plus size={16} /> New Event
          </Button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-sm rounded-card border border-border bg-surface p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-text-primary">New Event</p>
              <button
                onClick={() => setShowModal(false)}
                className="text-text-muted hover:text-text-primary"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <form className="flex flex-col gap-3" onSubmit={handleCreateEvent}>
              <input
                type="text"
                placeholder="Event title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full rounded-card border border-input-border bg-input-bg px-3.5 py-2 text-sm focus:outline-none focus:border-accent"
                required
              />
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full rounded-card border border-input-border bg-input-bg px-3.5 py-2 text-sm focus:outline-none focus:border-accent"
                required
              />
              <input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full rounded-card border border-input-border bg-input-bg px-3.5 py-2 text-sm focus:outline-none focus:border-accent"
              />
              <Button type="submit" className="mt-1" disabled={saving}>
                {saving ? "Adding..." : "Add Event"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}