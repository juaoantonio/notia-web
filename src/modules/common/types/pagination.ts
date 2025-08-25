export type PaginatedResponse<T> = {
  data: Array<T>;
  meta: {
    page: number;
    limit: number;
    count: number;
    total: number;
    totalPages: number;
    hasPrev: boolean;
    hasNext: boolean;
    prevPage: number | null;
    nextPage: number | null;
  };
};
