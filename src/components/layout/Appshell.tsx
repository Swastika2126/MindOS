import { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";

interface AppShellProps {
  children: ReactNode;
  userName?: string;
  userPlan?: string;
}

/**
 * Full-bleed dashboard frame: Sidebar + scrollable main.
 * TopBar is rendered per page (title/actions differ).
 */
export default function AppShell({ children, userName, userPlan }: AppShellProps) {
  return (
    <div className="flex h-screen bg-bg">
      <Sidebar userName={userName} userPlan={userPlan} />
      <main className="flex-1 overflow-y-auto bg-surface">{children}</main>
    </div>
  );
}
