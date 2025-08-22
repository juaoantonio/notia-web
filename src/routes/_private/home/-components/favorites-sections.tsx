import { ChevronRight, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import type { Folder } from "@/modules/home/home.types";

type Props = { favorites: Folder[]; loading: boolean };

export function FavoritesSection({ favorites, loading }: Props) {
  return (
    <section className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-muted-foreground text-sm font-medium">Meus Favoritos</h2>
        <span className="text-muted-foreground text-xs">{favorites.length}</span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {loading &&
          Array.from({ length: 2 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="bg-muted mb-2 h-5 w-40 rounded" />
                <div className="bg-muted h-4 w-56 rounded" />
              </CardContent>
            </Card>
          ))}

        {!loading &&
          favorites.map((f) => (
            <Card key={f.id} className="shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="flex items-start gap-3 p-4">
                <div className="bg-primary/10 text-primary grid size-9 place-items-center rounded-lg">
                  <Star className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{f.name}</p>
                  <p className="text-muted-foreground truncate text-xs">{f.description}</p>
                  <div className="mt-1 flex items-center gap-2">
                    {f.isPublic && <Badge className="h-5 rounded-full text-[10px]">Público</Badge>}
                    <span className="text-muted-foreground text-xs">{f.linksCount} links</span>
                  </div>
                </div>
                <ChevronRight className="text-muted-foreground h-4 w-4" />
              </CardContent>
            </Card>
          ))}

        {!loading && !favorites.length && (
          <Card>
            <CardContent className="text-muted-foreground p-4 text-sm">
              Mark folders as favorite to see them here.
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
