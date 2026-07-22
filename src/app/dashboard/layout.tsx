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
    <div className="flex min-h-screen bg-bg p-6 border border-red">
      {/* <div className="grid w-full max-w-4xl h-[85vh] overflow-hidden rounded-modal border border-border shadow-xl md:grid-cols-[16rem_1fr]"> */}
        <Sidebar />
        <main className=" flex-1 overflow-y-auto bg-surface border border-red">
          {children}
        </main>
      {/* </div> */}
    </div>
  );
}