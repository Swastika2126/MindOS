"use client";

import { useState } from "react";
import { Upload, FileText } from "lucide-react";
import TopBar from "@/components/layout/TopBar";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

interface VaultFile {
  id: string;
  name: string;
  category: "study" | "work" | "personal" | "health";
  date: string;
}

const files: VaultFile[] = [
  { id: "1", name: "DBMS Notes.pdf", category: "study", date: "June 28" },
  { id: "2", name: "Internship Report.docx", category: "work", date: "June 25" },
  { id: "3", name: "System Design.pdf", category: "study", date: "June 20" },
  { id: "4", name: "Grocery List.txt", category: "personal", date: "June 19" },
  { id: "5", name: "Resume v3.pdf", category: "work", date: "June 15" },
  { id: "6", name: "Research Paper.pdf", category: "study", date: "June 10" },
];

const filters = ["All", "Study", "Work", "Personal", "Health", "Links"] as const;

export default function VaultPage() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");

  const visible =
    activeFilter === "All"
      ? files
      : files.filter((f) => f.category === activeFilter.toLowerCase());

  return (
    <div className="min-h-screen bg-background">
      <TopBar
        title="Knowledge Vault"
        searchPlaceholder="Search files, notes, links..."
        action={
          <Button className="w-auto px-5">
            <Upload size={16} /> Upload File
          </Button>
        }
      />

      <div className="p-10">
        <div className="mb-10 flex gap-8 border-b border-border text-base">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`pb-4 font-medium transition-colors ${
                activeFilter === f
                  ? "border-b-2 border-accent text-accent"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visible.map((file) => (
            <div
              key={file.id}
              className="flex flex-col gap-4 rounded-card border border-border bg-surface p-6 transition-colors hover:border-accent hover:shadow-sm"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-md bg-accent-soft text-accent">
                <FileText size={22} />
              </span>
              <p className="text-base font-semibold text-text-primary">{file.name}</p>
              <div className="flex items-center justify-between mt-auto">
                <Badge label={file.category} tone={file.category} />
                <span className="text-xs text-text-muted">{file.date}</span>
              </div>
            </div>
          ))}

          {visible.length === 0 && (
            <p className="col-span-full py-16 text-center text-sm text-text-muted">
              No files in this category yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}