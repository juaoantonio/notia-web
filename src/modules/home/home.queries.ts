import { queryOptions } from "@tanstack/react-query";

import { api } from "@/lib/api.ts";
import type { PaginatedResponse } from "@/modules/common/types/pagination.ts";

import type { Folder, LinkItem } from "./home.types";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function fetchFolders() {
  const response = await api.get<PaginatedResponse<Folder>>("/folders");
  return response.data;
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
      isFavorite: true,
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

export const foldersQueryOptions = queryOptions({
  queryKey: ["folders"],
  queryFn: fetchFolders,
});

export const recentLinksQueryOptions = queryOptions({
  queryKey: ["links", "recent", "mock", { limit: 8 }],
  queryFn: fetchRecentLinksMock,
  staleTime: 20_000,
});
