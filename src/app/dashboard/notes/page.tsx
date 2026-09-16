"use client";

import { useMemo, useState } from "react";
import { Plus, FileText, X } from "lucide-react";
import TopBar from "@/components/layout/TopBar";
import Button from "@/components/ui/Button";

interface Note {
  id: string;
  title: string;
  preview: string;
  updatedAt: string;
}

const initialNotes: Note[] = [
  {
    id: "1",
    title: "Meeting notes - Q3 planning",
    preview: "Discussed roadmap priorities...",
    updatedAt: "2 hours ago",
  },
  {
    id: "2",
    title: "Book ideas",
    preview: "Atomic Habits, Deep Work...",
    updatedAt: "Yesterday",
  },
  {
    id: "3",
    title: "Recipe: Pasta",
    preview: "Ingredients: garlic, olive oil...",
    updatedAt: "3 days ago",
  },
];

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newPreview, setNewPreview] = useState("");

  function handleAddNote() {
    if (!newTitle.trim()) return;

    setNotes((prev) => [
      {
        id: Date.now().toString(),
        title: newTitle.trim(),
        preview: newPreview.trim() || "New note...",
        updatedAt: "Just now",
      },
      ...prev,
    ]);

    setNewTitle("");
    setNewPreview("");
    setShowAddForm(false);
  }

  function removeNote(id: string) {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  }

  const filteredNotes = useMemo(() => {
    const q = search.toLowerCase().trim();

    if (!q) return notes;

    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(q) ||
        note.preview.toLowerCase().includes(q)
    );
  }, [notes, search]);

  return (
    <div>
      <TopBar
        title="Notes"
        searchPlaceholder="Search notes..."
        searchValue={search}
        onSearchChange={setSearch}
        action={
          <Button
            className="w-auto px-5"
            onClick={() => setShowAddForm((v) => !v)}
          >
            <Plus size={16} /> New Note
          </Button>
        }
      />

      <div className="p-6 md:p-8">
        {showAddForm && (
          <div className="mb-6 rounded-card border border-border bg-surface p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-text-primary">
                New Note
              </p>

              <button
                onClick={() => setShowAddForm(false)}
                className="text-text-muted hover:text-text-primary"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Note title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="rounded-card border border-input-border bg-input-bg px-3.5 py-2 text-sm focus:border-accent focus:outline-none"
              />

              <textarea
                rows={4}
                placeholder="Write your note..."
                value={newPreview}
                onChange={(e) => setNewPreview(e.target.value)}
                className="resize-none rounded-card border border-input-border bg-input-bg px-3.5 py-2 text-sm focus:border-accent focus:outline-none"
              />

              <Button
                className="w-auto self-start px-5"
                onClick={handleAddNote}
              >
                Save Note
              </Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {filteredNotes.length === 0 ? (
            <p className="col-span-full py-12 text-center text-sm text-text-muted">
              No notes found.
            </p>
          ) : (
            filteredNotes.map((note) => (
              <div
                key={note.id}
                className="flex cursor-pointer flex-col gap-3 rounded-card border border-border bg-surface p-5 hover:border-accent"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent-soft text-accent">
                    <FileText size={18} />
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeNote(note.id);
                    }}
                    className="text-xs text-text-muted hover:text-error"
                  >
                    Delete
                  </button>
                </div>

                <div>
                  <p className="text-sm font-semibold text-text-primary">
                    {note.title}
                  </p>

                  <p className="mt-1 line-clamp-2 text-xs text-text-secondary">
                    {note.preview}
                  </p>
                </div>

                <p className="text-[11px] text-text-muted">
                  {note.updatedAt}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}