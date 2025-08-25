import { queryOptions } from "@tanstack/react-query";

import { api } from "@/lib/api.ts";
import type { PaginatedResponse } from "@/modules/common/types/pagination.ts";

import type { FolderListItem, Link } from "./home.types";

async function fetchPaginatedFolders() {
  const response = await api.get<PaginatedResponse<FolderListItem>>("/folders");
  return response.data;
}

async function fetchPaginatedFavoriteFolders() {
  const response = await api.get<PaginatedResponse<FolderListItem>>("/folders", {
    params: {
      isFavorite: true,
    },
  });
  return response.data;
}

async function fetchPaginatedRecentLinks() {
  const response = await api.get<PaginatedResponse<Link>>("/links");
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
