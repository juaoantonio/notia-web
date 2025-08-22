import { type ReactNode } from "react";

type Props = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function SettingsSection({ title, description, children }: Props) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-sm font-medium">{title}</h2>
        {description && <p className="text-muted-foreground mt-1 text-xs">{description}</p>}
      </div>
      <div className="divide-border overflow-hidden rounded-xl border">{children}</div>
    </section>
  );
}
