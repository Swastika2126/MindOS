import { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";

interface AppShellProps {
  children: ReactNode;
  userName?: string;
  userPlan?: string;
}

/**
 * Wraps Sidebar + main content. TopBar is NOT included here on purpose —
 * each page renders its own TopBar since the title/search/action button
 * differs per page. AppShell only owns the outer frame.
 */
export default function AppShell({ children, userName, userPlan }: AppShellProps) {
  return (
    <div className="flex h-screen bg-bg border border-red">
      <Sidebar userName={userName} userPlan={userPlan} />
      <main className="flex-1 overflow-y-auto border border-red-500">{children}</main>
    </div>
  );
}