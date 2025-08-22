import { Globe, Link2, MoreVertical } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card.tsx";
import type { LinkItem } from "@/modules/home/home.types";
import { faviconLetter, hostnameOf } from "@/modules/home/home.utils";

import { AvatarSkeleton, LineSkeleton } from "./skeletons";

type Props = { recent: LinkItem[]; loading: boolean };

export function RecentLinksList({ recent, loading }: Props) {
  return (
    <section className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-muted-foreground text-sm font-medium">Recentes</h2>
        {!loading && <span className="text-muted-foreground text-xs">{recent.length}</span>}
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <ul className="divide-border divide-y">
            {loading &&
              Array.from({ length: 6 }).map((_, i) => (
                <li key={i} className="flex items-center gap-3 px-4 py-3">
                  <AvatarSkeleton />
                  <div className="min-w-0 flex-1">
                    <LineSkeleton w="w-48" />
                    <LineSkeleton w="w-36" h="h-3" />
                  </div>
                  <LineSkeleton w="w-10" h="h-4" />
                </li>
              ))}

            {!loading &&
              (recent.length ? (
                recent.map((lnk) => (
                  <li key={lnk.id} className="flex items-center gap-3 px-4 py-3">
                    <div className="bg-primary/10 text-primary grid h-8 w-8 flex-none place-items-center rounded-md">
                      <span className="text-sm font-medium">{faviconLetter(lnk.url)}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{lnk.title || lnk.url}</p>
                      <p className="text-muted-foreground flex items-center gap-1 truncate text-xs">
                        <Globe className="h-3.5 w-3.5" />
                        {hostnameOf(lnk.url)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link2 className="text-muted-foreground h-4 w-4" />
                      <button
                        type="button"
                        className="text-muted-foreground hover:text-foreground rounded-md p-2"
                        aria-label={`Open menu for ${lnk.title || lnk.url}`}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <li className="text-muted-foreground px-4 py-6 text-sm">
                  Recently added links will appear here.
                </li>
              ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}
