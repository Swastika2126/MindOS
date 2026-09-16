import { ReactNode } from "react";
import { Search, Bell } from "lucide-react";

interface TopBarProps {
  title: string;
  searchPlaceholder?: string;
  action?: ReactNode;
  userName?: string;
  userAvatarUrl?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

export default function TopBar({
  title,
  searchPlaceholder,
  action,
  userName = "Guest",
  userAvatarUrl,
  searchValue = "",
  onSearchChange,
}: TopBarProps) {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-border bg-bg px-4 py-4 md:px-8 md:py-5">
      <h1 className="font-serif text-xl text-text-primary md:text-2xl">
        {title}
      </h1>

      <div className="flex items-center gap-3 md:gap-4">
        {searchPlaceholder && (
          <div className="hidden items-center gap-2 rounded-card border border-input-border bg-input-bg px-3.5 py-2 sm:flex sm:w-48 md:w-64">
            <Search size={16} className="text-text-muted" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
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
            <img
              src={userAvatarUrl}
              alt={userName}
              className="h-full w-full object-cover"
            />
          ) : (
            userName.charAt(0).toUpperCase()
          )}
        </span>
      </div>
    </header>
  );
}