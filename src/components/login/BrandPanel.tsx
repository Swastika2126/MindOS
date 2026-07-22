import { ReactNode } from "react";
import { Calendar, Briefcase, TrendingUp, Quote } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: ReactNode;
  active?: boolean; // the one card that carries the accent color
}

const features: Feature[] = [
  {
    title: "Plan your day",
    description: "Organize tasks and stay on track.",
    icon: <Calendar size={20} />,
  },
  {
    title: "Manage everything",
    description: "Keep notes, files and ideas together.",
    icon: <Briefcase size={20} />,
  },
  {
    title: "Track your progress",
    description: "See your growth and achieve more every day.",
    icon: <TrendingUp size={20} />,
    active: true,
  },
];

export default function BrandPanel() {
  return (
    <div className="flex h-full flex-col justify-between bg-panelLeft p-10">
      {/* Logo */}
      <div>
        <div className="mb-8 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-sm font-bold text-text-onAccent">
            M
          </span>
          <span className="text-sm font-semibold text-text-primary">MindOS</span>
        </div>

        {/* Heading */}
        <h1 className="font-serif text-4xl leading-tight text-text-primary">
          Your second brain.
          <br />
          <span className="italic text-text-secondary">Everything in one place.</span>
        </h1>
        <p className="mt-3 text-sm font-medium text-accent">
          AI powered. All your data. One place.
        </p>

        {/* Feature cards */}
        <div className="mt-8 grid grid-cols-3 gap-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`flex flex-col justify-between rounded-card p-3 ${
                feature.active ? "bg-accent" : "bg-panelRight"
              }`}
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-md ${
                  feature.active ? "bg-white/20 text-text-onAccent" : "bg-accent-soft text-accent"
                }`}
              >
                {feature.icon}
              </span>

              <div className="mt-6">
                <p
                  className={`text-xs font-semibold ${
                    feature.active ? "text-text-onAccent" : "text-text-primary"
                  }`}
                >
                  {feature.title}
                </p>
                <p
                  className={`mt-1 text-[11px] leading-snug ${
                    feature.active ? "text-white/80" : "text-text-muted"
                  }`}
                >
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Affirmation */}
      <div className="mt-8 flex items-start gap-3 rounded-card border border-border bg-panelRight p-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-text-onAccent">
          <Quote size={16} />
        </span>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
            Daily affirmation
          </p>
          <p className="mt-1 font-serif text-sm italic text-text-primary">
            &ldquo;Small progress every day leads to big results.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}