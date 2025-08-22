import { queryOptions } from "@tanstack/react-query";

import type { Folder, LinkItem } from "./home.types";

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

export const foldersQueryOptions = queryOptions({
  queryKey: ["folders", "mock", { limit: 6 }],
  queryFn: fetchFoldersMock,
  staleTime: 20_000,
});

export const recentLinksQueryOptions = queryOptions({
  queryKey: ["links", "recent", "mock", { limit: 8 }],
  queryFn: fetchRecentLinksMock,
  staleTime: 20_000,
});
