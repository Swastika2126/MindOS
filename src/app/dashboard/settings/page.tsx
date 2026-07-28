"use client";

import { useState } from "react";
import TopBar from "@/components/layout/TopBar";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

const tabs = ["Profile", "Notifications", "Integrations", "Appearance", "Account"] as const;

// Profile form is local-only for now. Persist via Firestore after auth is wired.
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Profile");

  const [name, setName] = useState("Jane Doe");
  const [email, setEmail] = useState("jane@example.com");
  const [university, setUniversity] = useState("");
  const [role, setRole] = useState("Student");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaving(true);
    setSaved(false);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
    }, 400);
  }

  return (
    <div>
      <TopBar title="Settings" />

      <div className="flex flex-col md:flex-row">
        <div className="w-full shrink-0 border-b border-border p-6 md:w-56 md:border-b-0 md:border-r">
          <p className="mb-4 px-3 text-sm font-semibold text-text-primary">Configuration</p>
          <nav className="flex flex-row gap-1 overflow-x-auto md:flex-col">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 rounded-card px-3 py-2 text-left text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-sidebarItemActive text-sidebarItemActiveText"
                    : "text-text-secondary hover:bg-sidebarItemHover"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1 p-6 md:p-8">
          {activeTab === "Profile" && (
            <div className="max-w-2xl">
              <h2 className="font-serif text-xl text-text-primary">Profile</h2>
              <p className="mt-1 text-sm text-text-secondary">
                Manage your personal information and public identity.
              </p>

              <div className="mt-6 flex items-center gap-4">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft text-xl font-semibold text-accent">
                  {name.charAt(0).toUpperCase() || "?"}
                </span>
                <div>
                  <p className="text-sm font-medium text-text-primary">Your Photo</p>
                  <p className="text-xs text-text-muted">
                    This will be displayed on your profile and workspace.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input id="fullName" label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                <Input id="email" label="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input id="university" label="University" value={university} onChange={(e) => setUniversity(e.target.value)} />
                <Input id="role" label="Role" value={role} onChange={(e) => setRole(e.target.value)} />
              </div>

              <div className="mt-8 border-t border-border pt-6">
                <h3 className="text-sm font-semibold text-text-primary">Integrations</h3>
                <div className="mt-3 flex items-center justify-between rounded-card border border-border bg-surface p-4">
                  <div>
                    <p className="text-sm font-medium text-text-primary">Google Calendar</p>
                    <p className="text-xs text-text-muted">
                      Sync your personal and academic schedule.
                    </p>
                  </div>
                  <Badge label="Not Connected" tone="low" />
                </div>
              </div>

              <div className="mt-8 flex items-center justify-end gap-3">
                {saved && <span className="text-xs text-success">Saved!</span>}
                <Button className="w-auto px-6" onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          )}

          {activeTab !== "Profile" && (
            <p className="text-sm text-text-muted">{activeTab} settings are coming soon.</p>
          )}
        </div>
      </div>
    </div>
  );
}