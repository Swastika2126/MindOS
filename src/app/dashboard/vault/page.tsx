"use client";

import { useMemo, useRef, useState } from "react";
import { Upload, FileText, Pencil, Trash2, Download } from "lucide-react";
import TopBar from "@/components/layout/TopBar";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

interface VaultFile {
  id: string;
  name: string;
  category: "study" | "work" | "personal" | "health";
  date: string;
  url?: string;
}

const initialFiles: VaultFile[] = [
  { id: "1", name: "DBMS Notes.pdf", category: "study", date: "June 28" },
  { id: "2", name: "Internship Report.docx", category: "work", date: "June 25" },
  { id: "3", name: "System Design.pdf", category: "study", date: "June 20" },
  { id: "4", name: "Grocery List.txt", category: "personal", date: "June 19" },
  { id: "5", name: "Resume v3.pdf", category: "work", date: "June 15" },
  { id: "6", name: "Research Paper.pdf", category: "study", date: "June 10" },
];

const filters = ["All", "Study", "Work", "Personal", "Health"] as const;

export default function VaultPage() {
  const [files, setFiles] = useState(initialFiles);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>("All");

  const [showUpload, setShowUpload] = useState(false);
  const [uploadCategory, setUploadCategory] =
    useState<VaultFile["category"]>("study");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const visible = useMemo(() => {
    return files.filter((f) => {
      const matchesFilter =
        activeFilter === "All"
          ? true
          : f.category === activeFilter.toLowerCase();

      const matchesSearch =
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.category.toLowerCase().includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [files, activeFilter, search]);

  function formatDate() {
    return new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected) return;

    const url = URL.createObjectURL(selected);

    setFiles((prev) => [
      {
        id: Date.now().toString(),
        name: selected.name,
        category: uploadCategory,
        date: formatDate(),
        url,
      },
      ...prev,
    ]);

    setShowUpload(false);
    e.target.value = "";
  }

  function removeFile(id: string) {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }

  function renameFile(id: string) {
    const current = files.find((f) => f.id === id);
    if (!current) return;

    const next = prompt("Rename file", current.name);
    if (!next?.trim()) return;

    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, name: next.trim() } : f))
    );
  }

  return (
    <div>
      <TopBar
        title="Knowledge Vault"
        searchPlaceholder="Search files..."
        searchValue={search}
        onSearchChange={setSearch}
        action={
          <Button
            className="w-auto px-5"
            onClick={() => setShowUpload((v) => !v)}
          >
            <Upload size={16} /> Upload File
          </Button>
        }
      />

      <div className="p-10">
        {showUpload && (
          <div className="mb-8 rounded-card border border-border bg-surface p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <select
                value={uploadCategory}
                onChange={(e) =>
                  setUploadCategory(e.target.value as VaultFile["category"])
                }
                className="rounded-card border border-input-border bg-input-bg px-3 py-2 text-sm focus:border-accent focus:outline-none"
              >
                <option value="study">Study</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="health">Health</option>
              </select>

              <Button
                className="w-auto px-5"
                onClick={() => fileInputRef.current?.click()}
              >
                Choose File
              </Button>

              <Button
                variant="secondary"
                className="w-auto px-5"
                onClick={() => setShowUpload(false)}
              >
                Cancel
              </Button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        )}

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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((file) => (
            <div
              key={file.id}
              className="flex flex-col gap-4 rounded-card border border-border bg-surface p-6 transition-colors hover:border-accent hover:shadow-sm"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-md bg-accent-soft text-accent">
                <FileText size={22} />
              </span>

              <p className="break-words text-base font-semibold text-text-primary">
                {file.name}
              </p>

              <div className="flex items-center justify-between">
                <Badge label={file.category} tone={file.category} />
                <span className="text-xs text-text-muted">{file.date}</span>
              </div>

              <div className="mt-auto flex items-center justify-between pt-2">
                <button
                  onClick={() => renameFile(file.id)}
                  className="text-text-muted hover:text-accent"
                  title="Rename"
                >
                  <Pencil size={16} />
                </button>

                {file.url ? (
                  <a
                    href={file.url}
                    download={file.name}
                    className="text-text-muted hover:text-accent"
                    title="Download"
                  >
                    <Download size={16} />
                  </a>
                ) : (
                  <span className="text-text-muted">
                    <Download size={16} />
                  </span>
                )}

                <button
                  onClick={() => removeFile(file.id)}
                  className="text-text-muted hover:text-error"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          {visible.length === 0 && (
            <p className="col-span-full py-16 text-center text-sm text-text-muted">
              No files found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}