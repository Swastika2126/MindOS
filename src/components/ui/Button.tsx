import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

/**
 * Shared button used for both the "Sign In" action (primary)
 * and the "Continue with Google" action (secondary).
 */
export default function Button({
  children,
  variant = "primary",
  className = "",
  ...rest
}: ButtonProps) {
  const base =
    "w-full rounded-card px-4 py-3 text-sm font-semibold transition-colors flex items-center justify-center gap-2";

  const variants: Record<string, string> = {
    primary: "bg-accent text-text-onAccent hover:bg-accent-hover",
    secondary:
      "bg-panelRight text-text-primary border border-border hover:bg-input-bg",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}