import type { ReactNode } from "react";

import { User2 } from "lucide-react";

type Props = {
  title?: string;
  avatarUrl?: string | null;
  avatarAlt?: string;
  rightSlot?: ReactNode;
};

export function TopAppBar({ title = "My vault", avatarUrl, avatarAlt, rightSlot }: Props) {
  return (
    <header className="bg-background/70 sticky top-0 z-30 border-b backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-screen-md items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={avatarAlt ?? "User"}
              className="h-8 w-8 rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="bg-muted text-muted-foreground grid h-8 w-8 place-items-center rounded-full">
              <User2 className="h-4 w-4" />
            </div>
          )}
          <h1 className="text-base font-semibold">{title}</h1>
        </div>
        <div className="flex items-center gap-1">{rightSlot}</div>
      </div>
    </header>
  );
}
