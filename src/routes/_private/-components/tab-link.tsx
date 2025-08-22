import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";
import type { TabItem } from "@/routes/_private/-types.ts";

export function TabLink({ to, icon: Icon, label, disabled }: TabItem) {
  if (disabled) {
    return (
      <div className="text-muted-foreground flex flex-col items-center justify-center gap-1 p-2 py-3 text-xs">
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </div>
    );
  }
  return (
    <Link
      to={to}
      activeOptions={{ exact: true }}
      className="group flex flex-col items-center justify-center gap-1 p-2 py-3 text-xs"
      activeProps={{ className: "text-foreground" }}
      inactiveProps={{ className: "text-muted-foreground" }}
    >
      {({ isActive }) => (
        <>
          <Icon
            className={cn(
              "h-5 w-5",
              isActive ? "opacity-100" : "opacity-80 group-hover:opacity-100",
            )}
          />
          <span className={cn(isActive ? "font-medium" : "font-normal")}>{label}</span>
        </>
      )}
    </Link>
  );
}
