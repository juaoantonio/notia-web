import { type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";

export function SectionBadge({ children }: { children: ReactNode }) {
  return (
    <Badge className="rounded-full bg-muted text-muted-foreground">
      {children}
    </Badge>
  );
}

export { SectionBadge as SessionBadge };
