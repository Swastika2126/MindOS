import AppShell from "@/components/layout/Appshell"

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
