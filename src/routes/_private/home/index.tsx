import { useMemo } from "react";

import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight, FolderIcon, Globe, Link2, MoreVertical, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Separator } from "@/components/ui/separator.tsx";

export const Route = createFileRoute("/_private/home/")({
  component: HomePage,
  staticData: {
    navigable: true,
    breadcrumb: "Home",
  },
});

/** =========================================================
 *  TIPOS (alinhados ao seu Prisma)
 * ======================================================= */
type Folder = {
  id: string;
  name: string;
  description: string;
  isPublic: boolean;
  linksCount: number;
  favorite?: boolean;
};

type LinkItem = {
  id: string;
  url: string;
  title: string;
  description: string;
  folderId: string;
  createdAt: string;
  favorite?: boolean;
};

/** =========================================================
 *  MOCK QUERIES (simulam latência)
 * ======================================================= */
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function fetchFoldersMock(): Promise<Folder[]> {
  await delay(550);
  return [
    {
      id: "f-1",
      name: "Algoritmos",
      description: "Estruturas de dados, grafos e programação competitiva",
      isPublic: false,
      linksCount: 42,
      favorite: true,
    },
    {
      id: "f-2",
      name: "Backend • Fastify",
      description: "Plugins, patterns, auth, Prisma e Postgres",
      isPublic: false,
      linksCount: 31,
    },
    {
      id: "f-3",
      name: "IA & Embeddings",
      description: "Retrieval, chunking e avaliação",
      isPublic: true,
      linksCount: 18,
      favorite: true,
    },
    {
      id: "f-4",
      name: "UX Writing",
      description: "Microcopy, heurísticas e exemplos",
      isPublic: false,
      linksCount: 12,
    },
  ];
}

async function fetchRecentLinksMock(): Promise<LinkItem[]> {
  await delay(700);
  return [
    {
      id: "l-1",
      url: "https://build-your-own.org/webserver/",
      title: "Build Your Own Web Server",
      description: "Anotações sobre HTTP, sockets e Node",
      folderId: "f-2",
      createdAt: new Date().toISOString(),
      favorite: true,
    },
    {
      id: "l-2",
      url: "https://fastify.dev/docs/latest/Reference/Server/",
      title: "Fastify Server Reference",
      description: "API do servidor, hooks e lifecycle",
      folderId: "f-2",
      createdAt: new Date().toISOString(),
    },
    {
      id: "l-3",
      url: "https://beta.reactrouter.com/",
      title: "TanStack Router (beta docs)",
      description: "Routing moderno em React",
      folderId: "f-1",
      createdAt: new Date().toISOString(),
    },
    {
      id: "l-4",
      url: "https://prisma.io/docs",
      title: "Prisma Docs",
      description: "Schema, migrations e performance",
      folderId: "f-2",
      createdAt: new Date().toISOString(),
    },
    {
      id: "l-5",
      url: "https://uxwritinghub.com/blog/",
      title: "UX Writing Hub",
      description: "Boas práticas de microcopy",
      folderId: "f-4",
      createdAt: new Date().toISOString(),
    },
  ];
}

/** =========================================================
 *  HELPERS
 * ======================================================= */
function hostnameOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
const faviconLetter = (url: string) => hostnameOf(url)[0]?.toUpperCase() ?? "•";

/** =========================================================
 *  PÁGINA
 * ======================================================= */
function HomePage() {
  const { data: folders, isLoading: loadingFolders } = useQuery({
    queryKey: ["folders", "mock", { limit: 6 }],
    queryFn: fetchFoldersMock,
    staleTime: 20_000,
  });

  const { data: recent, isLoading: loadingRecent } = useQuery({
    queryKey: ["links", "recent", "mock", { limit: 8 }],
    queryFn: fetchRecentLinksMock,
    staleTime: 20_000,
  });

  const favorites = useMemo(() => (folders ?? []).filter((f) => f.favorite).slice(0, 3), [folders]);

  return (
    <div className="space-y-5">
      {/* Busca */}
      <div className="bg-background/70 rounded-xl border p-2 backdrop-blur">
        <div className="flex items-center gap-2">
          <Input id="vault-search" placeholder="Search" className="h-11 flex-1" />
          <Button variant="secondary" className="h-11 px-4">
            Search
          </Button>
        </div>
      </div>

      {/* Destaques (Favorites) */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-muted-foreground text-sm font-medium">MY FAVORITES</h2>
          <span className="text-muted-foreground text-xs">{favorites.length}</span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {loadingFolders &&
            Array.from({ length: 2 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4">
                  <div className="bg-muted mb-2 h-5 w-40 rounded" />
                  <div className="bg-muted h-4 w-56 rounded" />
                </CardContent>
              </Card>
            ))}

          {!loadingFolders &&
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
                      {f.isPublic && <Badge className="h-5 rounded-full text-[10px]">Public</Badge>}
                      <span className="text-muted-foreground text-xs">{f.linksCount} links</span>
                    </div>
                  </div>
                  <ChevronRight className="text-muted-foreground h-4 w-4" />
                </CardContent>
              </Card>
            ))}

          {!loadingFolders && !favorites.length && (
            <Card>
              <CardContent className="text-muted-foreground p-4 text-sm">
                Mark folders as favorite to see them here.
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Folders list */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-muted-foreground text-sm font-medium">MY FOLDERS</h2>
          {!loadingFolders && (
            <span className="text-muted-foreground text-xs">{folders?.length ?? 0}</span>
          )}
        </div>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <ul className="divide-border divide-y">
              {loadingFolders &&
                Array.from({ length: 4 }).map((_, i) => (
                  <li key={i} className="flex items-center gap-3 px-4 py-3">
                    <div className="bg-muted h-8 w-8 animate-pulse rounded-md" />
                    <div className="min-w-0 flex-1">
                      <div className="bg-muted mb-1 h-4 w-40 animate-pulse rounded" />
                      <div className="bg-muted h-3 w-56 animate-pulse rounded" />
                    </div>
                    <div className="bg-muted h-4 w-10 animate-pulse rounded" />
                  </li>
                ))}

              {!loadingFolders &&
                (folders?.length ? (
                  folders.map((f) => (
                    <li key={f.id} className="flex items-center gap-3 px-4 py-3">
                      <div className="bg-muted text-muted-foreground grid h-8 w-8 place-items-center rounded-md">
                        <FolderIcon className="h-4 w-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{f.name}</p>
                        <p className="text-muted-foreground truncate text-xs">{f.description}</p>
                        {f.isPublic && (
                          <Badge className="mt-1 h-5 rounded-full text-[10px]">Public</Badge>
                        )}
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

      {/* Resumo */}
      <section className="grid grid-cols-2 gap-3">
        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-muted-foreground text-xs">LINKS</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-2xl font-semibold">{(recent ?? []).length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-muted-foreground text-xs">PASTAS PÚBLICAS</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-2xl font-semibold">
              {(folders ?? []).filter((f) => f.isPublic).length}
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Recent links */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-muted-foreground text-sm font-medium">RECENT</h2>
          {!loadingRecent && (
            <span className="text-muted-foreground text-xs">{recent?.length ?? 0}</span>
          )}
        </div>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <ul className="divide-border divide-y">
              {loadingRecent &&
                Array.from({ length: 6 }).map((_, i) => (
                  <li key={i} className="flex items-center gap-3 px-4 py-3">
                    <div className="bg-muted h-8 w-8 animate-pulse rounded-md" />
                    <div className="min-w-0 flex-1">
                      <div className="bg-muted mb-1 h-4 w-48 animate-pulse rounded" />
                      <div className="bg-muted h-3 w-36 animate-pulse rounded" />
                    </div>
                    <div className="bg-muted h-4 w-10 animate-pulse rounded" />
                  </li>
                ))}

              {!loadingRecent &&
                (recent?.length ? (
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

      <Separator className="my-6" />
      <div className="text-muted-foreground text-xs">More coming soon…</div>
    </div>
  );
}
