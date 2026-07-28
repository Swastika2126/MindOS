import AppShell from "@/components/layout/AppShell";

/**
 * Full-bleed dashboard shell for all /dashboard/* routes.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
