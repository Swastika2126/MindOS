interface ProgressBarProps {
  value: number; // 0-100
  label?: string;
}

export default function ProgressBar({ value, label }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div>
      {label && (
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="font-medium text-text-secondary">{label}</span>
          <span className="font-semibold text-text-primary">{clamped}%</span>
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-input-bg">
        <div
          className="h-full rounded-full bg-accent transition-all"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}