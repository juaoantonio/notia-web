import { type ReactNode } from "react";

import { Badge } from "@/components/ui/badge";

export function SectionBadge({ children }: { children: ReactNode }) {
  return <Badge className="bg-muted text-muted-foreground rounded-full">{children}</Badge>;
}

export { SectionBadge as SessionBadge };
