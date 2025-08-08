import { type ReactNode } from "react";
import { Badge } from "@/components/ui/badge.tsx";

export function SectionBadge({ children }: { children: ReactNode }) {
  return (
    <Badge className="rounded-full bg-muted text-muted-foreground">
      {children}
    </Badge>
  );
}
