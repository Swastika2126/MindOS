import { ReactNode } from "react";
import { Search, Bell } from "lucide-react";

interface TopBarProps {
  title: string;
  searchPlaceholder?: string;   // omit to hide the search bar entirely
  action?: ReactNode;           // e.g. a <Button>+ Add Task</Button>
  userName?: string;
  userAvatarUrl?: string;
}

/**
 * Header shown above the main content on every dashboard page.
 * Each page controls its own title/search/action via props —
 * this component only owns the layout and styling.
 */
export default function TopBar({
  title,
  searchPlaceholder,
  action,
  userName = "Guest",
  userAvatarUrl,
}: TopBarProps) {
  return (
    <header className="flex items-center justify-between border-b border-border bg-bg px-8 py-5">
      <h1 className="font-serif text-2xl text-text-primary">{title}</h1>

      <div className="flex items-center gap-4">
        {searchPlaceholder && (
          <div className="flex items-center gap-2 rounded-card border border-input-border bg-input-bg px-3.5 py-2 w-64">
            <Search size={16} className="text-text-muted" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
            />
          </div>
        )}

        {action}

        <button
          type="button"
          aria-label="Notifications"
          className="flex h-9 w-9 items-center justify-center rounded-full text-text-secondary hover:bg-sidebarItemHover"
        >
          <Bell size={18} />
        </button>

        <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-accent-soft text-xs font-semibold text-accent">
          {userAvatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={userAvatarUrl} alt={userName} className="h-full w-full object-cover" />
          ) : (
            userName.charAt(0).toUpperCase()
          )}
        </span>
      </div>
    </header>
  );
}