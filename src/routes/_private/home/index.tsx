import { createFileRoute } from "@tanstack/react-router";

import { Separator } from "@/components/ui/separator.tsx";
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
  return (
    <div className="space-y-5">
      <SearchBar />
      <FavoritesFoldersSection />
      <FoldersList />

      <RecentLinksList />

      <Separator className="my-6" />
      <div className="text-muted-foreground text-xs">Em breve mais funcionalidades...</div>
    </div>
  );
}
