export type Folder = {
  id: string;
  name: string;
  description: string;
  isPublic: boolean;
  linksCount: number;
  isFavorite: boolean;
  publicSlug: PublicSlug | null;
};

export type PublicSlug = {
  slug: string;
  active: boolean;
  revokedAt: string | null;
};

export type LinkItem = {
  id: string;
  url: string;
  title: string;
  description: string;
  folderId: string;
  createdAt: string;
  isFavorite?: boolean;
};
