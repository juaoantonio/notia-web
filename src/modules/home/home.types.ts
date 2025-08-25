export type BaseFolder = {
  id: string;
  name: string;
  description: string;
  isPublic: boolean;
  isFavorite: boolean;
  publicSlug: PublicSlug | null;
};

export type FolderListItem = BaseFolder & {
  linksCount: number;
};

export type FolderDetail = BaseFolder & {
  links: Link[];
};

export type PublicSlug = {
  slug: string;
  active: boolean;
  revokedAt: string | null;
};

export type Link = {
  id: string;
  image: string | null;
  title: string;
  url: string;
  favicon: string | null;
  siteName: string | null;
  tags: LinkTag[];
  description: string | null;
  folderId: string;
};

export enum TagSource {
  MANUAL = "MANUAL",
  AI = "AI",
}

export type Tag = {
  id: string;
  name: string;
};

export type LinkTag = {
  tag: Tag;
  source: TagSource;
};
