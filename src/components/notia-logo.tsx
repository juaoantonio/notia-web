import { cn } from "@/lib/utils.ts";

export function NotiaLogo({ className }: { className?: string }) {
  const mergedClassName = cn("size-6", className);
  return (
    <svg viewBox="0 0 48 48" className={mergedClassName} aria-hidden="true">
      <rect
        x="4"
        y="4"
        width="40"
        height="40"
        rx="10"
        fill="currentColor"
        opacity="0.08"
      />
      <path d="M14 30V14h6l14 14v6H28L14 20v10z" fill="currentColor" />
    </svg>
  );
}
