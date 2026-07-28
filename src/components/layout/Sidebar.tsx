"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings } from "lucide-react";
import { navItems, settingsHref } from "@/lib/nav";

interface SidebarProps {
  userName?: string;
  userPlan?: string;
}

/**
 * Left navigation rail used on every dashboard screen.
 * Cream background, serif logo, terracotta accent for active state.
 */
export default function Sidebar({ userName = "Guest", userPlan = "Free Plan" }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col justify-between border-r border-border bg-sidebarBg p-5">
      <div>
        <div className="mb-8 flex items-center gap-2 px-1">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-sm font-bold text-text-onAccent">
            M
          </span>
          <div>
            <p className="font-serif text-base leading-none text-text-primary">MindOS</p>
            <p className="mt-0.5 text-[11px] text-text-muted">AI Productivity</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-card px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-sidebarItemActive text-sidebarItemActiveText"
                    : "text-text-secondary hover:bg-sidebarItemHover"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-4">
        <div className="rounded-card border border-border bg-surface p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
            Daily affirmation
          </p>
          <p className="mt-1 font-serif text-sm italic text-text-primary">
            &ldquo;Small progress every day leads to big results.&rdquo;
          </p>
        </div>

        <Link
          href={settingsHref}
          className={`flex items-center gap-3 rounded-card px-3 py-2.5 text-sm font-medium transition-colors ${
            pathname.startsWith(settingsHref)
              ? "bg-sidebarItemActive text-sidebarItemActiveText"
              : "text-text-secondary hover:bg-sidebarItemHover"
          }`}
        >
          <Settings size={18} />
          Settings
        </Link>

        <div className="flex items-center gap-2.5 border-t border-border px-1 pt-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent">
            {userName.charAt(0).toUpperCase()}
          </span>
          <div>
            <p className="text-sm font-medium leading-tight text-text-primary">{userName}</p>
            <p className="text-[11px] text-text-muted">{userPlan}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
