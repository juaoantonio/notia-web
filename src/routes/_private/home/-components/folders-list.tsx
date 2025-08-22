import { FolderIcon, MoreVertical } from "lucide-react";

import { Badge } from "@/components/ui/badge.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { cn } from "@/lib/utils.ts";
import type { Folder } from "@/modules/home/home.types";

import { AvatarSkeleton, LineSkeleton } from "./skeletons";

type Props = { folders: Folder[]; loading: boolean };

export function FoldersList({ folders, loading }: Props) {
  return (
    <section className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-muted-foreground text-sm font-medium">Minhas Pastas</h2>
        {!loading && <span className="text-muted-foreground text-xs">{folders.length}</span>}
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <ul className="divide-border divide-y">
            {loading &&
              Array.from({ length: 4 }).map((_, i) => (
                <li key={i} className="flex items-center gap-3 px-4 py-3">
                  <AvatarSkeleton />
                  <div className="min-w-0 flex-1">
                    <LineSkeleton />
                    <LineSkeleton w="w-56" h="h-3" />
                  </div>
                  <LineSkeleton w="w-10" h="h-4" />
                </li>
              ))}

            {!loading &&
              (folders.length ? (
                folders.map((f) => (
                  <li key={f.id} className="flex items-center gap-3 px-4 py-3">
                    <div className="bg-muted text-muted-foreground grid h-8 w-8 place-items-center rounded-md">
                      <FolderIcon className="h-4 w-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className={cn("flex items-center gap-2", f.isPublic && "mb-1.5")}>
                        <p className="truncate text-sm font-medium">{f.name}</p>
                        {f.isPublic && (
                          <Badge className="h-5 rounded-full text-[10px]">Público</Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground truncate text-xs">{f.description}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground text-xs">{f.linksCount}</span>
                      <button
                        type="button"
                        className="text-muted-foreground hover:text-foreground rounded-md p-2"
                        aria-label={`Open menu for ${f.name}`}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <li className="text-muted-foreground px-4 py-6 text-sm">
                  No folders yet. Create your first one with the + button.
                </li>
              ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}
