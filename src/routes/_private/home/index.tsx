import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { Separator } from "@/components/ui/separator.tsx";
import { recentLinksQueryOptions } from "@/modules/home/home.queries.ts";
import { FavoritesFoldersSection } from "@/routes/_private/home/-components/favorites-sections.tsx";
import { FoldersList } from "@/routes/_private/home/-components/folders-list.tsx";
import { RecentLinksList } from "@/routes/_private/home/-components/recent-links-list.tsx";
import { SearchBar } from "@/routes/_private/home/-components/search-bar.tsx";

export const Route = createFileRoute("/_private/home/")({
  component: HomePage,
  staticData: {
    navigable: true,
    breadcrumb: "Home",
  },
});

function HomePage() {
  const { data: recent, isLoading: loadingRecent } = useQuery(recentLinksQueryOptions);

  return (
    <div className="space-y-5">
      <SearchBar />
      <FavoritesFoldersSection />
      <FoldersList />

      <RecentLinksList recent={recent ?? []} loading={loadingRecent} />

      <Separator className="my-6" />
      <div className="text-muted-foreground text-xs">Em breve mais funcionalidades...</div>
    </div>
  );
}
