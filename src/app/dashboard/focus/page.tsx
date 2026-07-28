"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const SESSION_SECONDS = 25 * 60;

export default function FocusPage() {
  const [secondsLeft, setSecondsLeft] = useState(SESSION_SECONDS);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const minutes = Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (secondsLeft % 60).toString().padStart(2, "0");

  function handleSkip() {
    setRunning(false);
    setSecondsLeft(SESSION_SECONDS);
  }

  return (
    <div className="relative flex h-full flex-col items-center justify-center bg-bg">
      <Link
        href="/dashboard/planner"
        className="absolute right-8 top-6 rounded-card border border-dashed border-border px-3 py-1.5 text-xs font-medium text-text-secondary hover:border-accent hover:text-accent"
      >
        Exit Focus
      </Link>

      <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">
        Session 1 of 4
      </p>

      <p className="mt-4 font-serif text-8xl text-text-primary">
        {minutes}:{seconds}
      </p>

      <p className="mt-2 text-sm text-text-secondary">DBMS Assignment</p>

      <div className="mt-8 flex items-center gap-3">
        <button
          onClick={() => setRunning(false)}
          className="rounded-full border border-border bg-surface px-5 py-2 text-sm font-medium text-text-primary hover:bg-sidebarItemHover"
        >
          Pause
        </button>
        <button
          onClick={() => setRunning(true)}
          className="rounded-full bg-accent px-6 py-2 text-sm font-semibold text-text-onAccent hover:bg-accent-hover"
        >
          Start
        </button>
        <button
          onClick={handleSkip}
          className="rounded-full border border-border bg-surface px-5 py-2 text-sm font-medium text-text-primary hover:bg-sidebarItemHover"
        >
          Skip
        </button>
      </div>

      <p className="mt-10 text-xs text-text-muted">Focus streak: 3 days</p>
    </div>
  );
}