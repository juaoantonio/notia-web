export type Folder = {
  id: string;
  name: string;
  description: string;
  isPublic: boolean;
  linksCount: number;
  isFavorite: boolean;
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
