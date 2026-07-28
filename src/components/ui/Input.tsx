import { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;       // icon shown on the left, e.g. mail icon
  rightSlot?: ReactNode;  // element on the right, e.g. show/hide password button
}

/**
 * Labeled text input used across the login form.
 * Kept generic so it can be reused for email, password, or any future field.
 */
export default function Input({ label, icon, rightSlot, id, ...rest }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-text-primary">
        {label}
      </label>

      <div className="flex items-center gap-2 rounded-card border border-input-border bg-input-bg px-3.5 py-2.5 focus-within:border-accent">
        {icon && <span className="text-text-muted">{icon}</span>}

        <input
          id={id}
          {...rest}
          className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
        />

        {rightSlot}
      </div>
    </div>
  );
}