import Sidebar from "@/components/layout/Sidebar";

/**
 * Full-page wrapper for all dashboard pages. Centers a fixed-size
 * dashboard "card" on the page background, same pattern as LoginScreen.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg p-6">
      <div className="flex h-[85vh] w-full max-w-[1400px] overflow-hidden rounded-2xl border border-border shadow-lg">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-surface">
          {children}
        </main>
      </div>
    </div>
  );
}
