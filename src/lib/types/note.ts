export interface Note {
  id: string;
  userId: string;
  title: string;
  preview: string;
  content?: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}