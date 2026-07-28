"use client";

import { useState } from "react";
import { Plus, FileText } from "lucide-react";
import TopBar from "@/components/layout/TopBar";
import Button from "@/components/ui/Button";

interface Note {
  id: string;
  title: string;
  preview: string;
  updatedAt: string;
}

const initialNotes: Note[] = [
  { id: "1", title: "Meeting notes - Q3 planning", preview: "Discussed roadmap priorities...", updatedAt: "2 hours ago" },
  { id: "2", title: "Book ideas", preview: "Atomic Habits, Deep Work...", updatedAt: "Yesterday" },
  { id: "3", title: "Recipe: Pasta", preview: "Ingredients: garlic, olive oil...", updatedAt: "3 days ago" },
];

export default function NotesPage() {
  const [notes] = useState<Note[]>(initialNotes);

  return (
    <div>
      <TopBar
        title="Notes"
        searchPlaceholder="Search notes..."

        action={
          <Button className="w-auto px-5">
            <Plus size={16} /> New Note
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 md:grid-cols-3 md:p-8">
        {notes.map((note) => (
          <div
            key={note.id}
            className="flex cursor-pointer flex-col gap-3 rounded-card border border-border bg-surface p-5 hover:border-accent"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent-soft text-accent">
              <FileText size={18} />
            </span>
            <div>
              <p className="text-sm font-semibold text-text-primary">{note.title}</p>
              <p className="mt-1 text-xs text-text-secondary line-clamp-2">{note.preview}</p>
            </div>
            <p className="text-[11px] text-text-muted">{note.updatedAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}