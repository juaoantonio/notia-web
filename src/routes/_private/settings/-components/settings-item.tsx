import { type ReactNode } from "react";

import { ChevronRight } from "lucide-react";

type Props = {
  left?: ReactNode;
  title: string;
  subtitle?: string;
  right?: ReactNode;
  onClick?: () => void;
  asButton?: boolean;
};

export function SettingsItem({ left, title, subtitle, right, onClick, asButton }: Props) {
  const Comp = asButton ? "button" : "div";
  return (
    <Comp
      className="hover:bg-muted/40 flex w-full items-center gap-3 p-4 transition-colors"
      onClick={onClick}
    >
      {left && <div className="text-muted-foreground">{left}</div>}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{title}</p>
        {subtitle && <p className="text-muted-foreground truncate text-xs">{subtitle}</p>}
      </div>
      {right ?? <ChevronRight className="text-muted-foreground h-4 w-4" />}
    </Comp>
  );
}
