export type Folder = {
  id: string;
  name: string;
  description: string;
  isPublic: boolean;
  linksCount: number;
  favorite?: boolean;
};

export type LinkItem = {
  id: string;
  url: string;
  title: string;
  description: string;
  folderId: string;
  createdAt: string;
  favorite?: boolean;
};
