export interface CalendarEvent {
  id: string;
  userId: string;
  title: string;
  /** YYYY-MM-DD, local calendar date the event falls on */
  date: string;
  /** 24hr HH:mm, optional for all-day events */
  time?: string;
  notes?: string;
  createdAt?: unknown;
}