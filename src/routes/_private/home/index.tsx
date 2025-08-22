import { useMemo } from "react";

import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { Separator } from "@/components/ui/separator.tsx";
import { foldersQueryOptions, recentLinksQueryOptions } from "@/modules/home/home.queries.ts";
import type { Folder } from "@/modules/home/home.types.ts";
import { FavoritesSection } from "@/routes/_private/home/-components/favorites-sections.tsx";
import { FoldersList } from "@/routes/_private/home/-components/folders-list.tsx";
import { RecentLinksList } from "@/routes/_private/home/-components/recent-links-list.tsx";
import { SearchBar } from "@/routes/_private/home/-components/search-bar.tsx";
import { SummaryCards } from "@/routes/_private/home/-components/summary-cards.tsx";

export const Route = createFileRoute("/_private/home/")({
  component: HomePage,
  staticData: {
    navigable: true,
    breadcrumb: "Home",
  },
});

function HomePage() {
  const { data: folders, isLoading: loadingFolders } = useQuery(foldersQueryOptions);
  const { data: recent, isLoading: loadingRecent } = useQuery(recentLinksQueryOptions);

  const favorites: Folder[] = useMemo(
    () => (folders ?? []).filter((f) => f.isFavorite).slice(0, 3),
    [folders],
  );

  return (
    <div className="space-y-5">
      <SearchBar />
      <FavoritesSection favorites={favorites} loading={loadingFolders} />
      <FoldersList folders={folders ?? []} loading={loadingFolders} />
      <SummaryCards
        linksCount={(recent ?? []).length}
        publicFoldersCount={(folders ?? []).filter((f) => f.isPublic).length}
      />
      <RecentLinksList recent={recent ?? []} loading={loadingRecent} />

      <Separator className="my-6" />
      <div className="text-muted-foreground text-xs">Em breve mais funcionalidades...</div>
    </div>
  );
}
