interface BadgeProps {
  label: string;
  tone: "high" | "medium" | "low" | "study" | "work" | "personal" | "health" | "connected";
}

const toneClasses: Record<BadgeProps["tone"], string> = {
  high: "bg-priorityHighBg text-priorityHighText",
  medium: "bg-priorityMediumBg text-priorityMediumText",
  low: "bg-priorityLowBg text-priorityLowText",
  study: "bg-tagStudyBg text-tagStudyText",
  work: "bg-tagWorkBg text-tagWorkText",
  personal: "bg-tagPersonalBg text-tagPersonalText",
  health: "bg-tagHealthBg text-tagHealthText",
  connected: "bg-statusConnectedBg text-statusConnectedText",
};

/**
 * Small pill used for priority levels, category tags, and status
 * indicators (e.g. "Connected"). Add a new tone in toneClasses +
 * a matching color pair in colors.css to extend it.
 */
export default function Badge({ label, tone }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${toneClasses[tone]}`}
    >
      {label}
    </span>
  );
}