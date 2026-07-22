import Sidebar from "@/components/layout/Sidebar";

/**
 * Full-page wrapper for all dashboard pages. Centers a fixed-size
 * dashboard "card" on the page background, same pattern as LoginModal.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg p-6">
      <div className="grid w-full max-w-4xl h-[85vh] overflow-hidden rounded-modal border border-border shadow-xl md:grid-cols-[16rem_1fr]">
        <Sidebar />
        <main className="overflow-y-auto bg-surface">
          {children}
        </main>
      </div>
    </div>
  );
}