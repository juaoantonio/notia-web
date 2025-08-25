import { queryOptions } from "@tanstack/react-query";

import { api } from "@/lib/api.ts";
import type { PaginatedResponse } from "@/modules/common/types/pagination.ts";

import type { Folder, LinkItem } from "./home.types";

async function fetchPaginatedFolders() {
  const response = await api.get<PaginatedResponse<Folder>>("/folders");
  return response.data;
}

async function fetchPaginatedFavoriteFolders() {
  const response = await api.get<PaginatedResponse<Folder>>("/folders", {
    params: {
      isFavorite: true,
    },
  });
  return response.data;
}

async function fetchPaginatedRecentLinks() {
  const response = await api.get<PaginatedResponse<LinkItem>>("/links");
  return response.data;
}

export const paginatedFoldersQueryOptions = queryOptions({
  queryKey: ["folders"],
  queryFn: fetchPaginatedFolders,
});

export const paginatedFavoriteFoldersQueryOptions = queryOptions({
  queryKey: [
    "folders",
    {
      isFavorite: true,
    },
  ],
  queryFn: fetchPaginatedFavoriteFolders,
});

export const paginatedRecentLinksQueryOptions = queryOptions({
  queryKey: ["links", "recent"],
  queryFn: fetchPaginatedRecentLinks,
});
