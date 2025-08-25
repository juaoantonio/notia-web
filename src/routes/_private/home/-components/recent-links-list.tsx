import { useQuery } from "@tanstack/react-query";
import { Globe, Link2, MoreVertical } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { paginatedRecentLinksQueryOptions } from "@/modules/home/home.queries.ts";
import { faviconLetter, hostnameOf } from "@/modules/home/home.utils";

import { AvatarSkeleton, LineSkeleton } from "./skeletons";

export function RecentLinksList() {
  const {
    data: paginatedRecentLinks,
    isPending,
    error,
  } = useQuery(paginatedRecentLinksQueryOptions);

  if (error) {
    return null;
  }

  return (
    <section className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-muted-foreground text-sm font-medium">Links Recentes</h2>
        {!isPending && (
          <span className="text-muted-foreground text-xs">{paginatedRecentLinks.meta.count}</span>
        )}
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <ul className="divide-border divide-y">
            {isPending &&
              Array.from({ length: 6 }).map((_, i) => (
                <li key={i} className="flex items-center gap-3 px-4 py-3">
                  <AvatarSkeleton />
                  <div className="min-w-0 flex-1">
                    <LineSkeleton w="w-48" />
                    <LineSkeleton w="w-36" h="h-3" />
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      <LineSkeleton w="w-10" h="h-4" />
                      <LineSkeleton w="w-12" h="h-4" />
                      <LineSkeleton w="w-8" h="h-4" />
                    </div>
                  </div>
                  <LineSkeleton w="w-10" h="h-4" />
                </li>
              ))}

            {!isPending &&
              (paginatedRecentLinks.meta.count ? (
                paginatedRecentLinks.data.map((lnk) => {
                  const tags = (lnk.tags ?? []) as Array<{ tag: { id: string; name: string } }>;
                  const maxVisible = 4;
                  const visibleTags = tags.slice(0, maxVisible);
                  const remaining = Math.max(0, tags.length - maxVisible);

                  return (
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

                        {tags.length > 0 && (
                          <div className="mt-1 flex flex-wrap items-center gap-1.5">
                            {visibleTags.map(({ tag }) => (
                              <Badge
                                key={tag.id}
                                variant="secondary"
                                className="rounded-sm px-1.5 py-0 text-[10px] font-medium"
                              >
                                {tag.name}
                              </Badge>
                            ))}
                            {remaining > 0 && (
                              <span className="text-muted-foreground text-[10px]">
                                +{remaining}
                              </span>
                            )}
                          </div>
                        )}
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
                  );
                })
              ) : (
                <li className="text-muted-foreground px-4 py-6 text-sm">
                  Links recentes aparecerão aqui.
                </li>
              ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}
