import {
  Calendar,
  CheckCircle,
  Star,
  FileText,
  Database,
  Sparkles,
  Timer,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

/** Primary sidebar destinations under /dashboard. */
export const navItems: NavItem[] = [
  { label: "Planner", href: "/dashboard/planner", icon: Calendar },
  { label: "Tasks", href: "/dashboard/tasks", icon: CheckCircle },
  { label: "Goals", href: "/dashboard/goals", icon: Star },
  { label: "Notes", href: "/dashboard/notes", icon: FileText },
  { label: "Knowledge Vault", href: "/dashboard/vault", icon: Database },
  { label: "AI Assistant", href: "/dashboard/assistant", icon: Sparkles },
  { label: "Focus", href: "/dashboard/focus", icon: Timer },
];

export const settingsHref = "/dashboard/settings";
