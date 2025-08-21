import { queryOptions, useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api";

import type { AxiosError } from "axios";

export interface User {
  id: string;
  username: string;
  email: string;
}

export const meQueryOptions = queryOptions<User | null>({
  queryKey: ["me"],
  queryFn: async () => {
    try {
      const { data } = await api.get<User>("/me");
      return data;
    } catch (err) {
      const e = err as AxiosError;
      if (e.response?.status === 401) return null; // não logado
      throw err; // outros erros sobem
    }
  },
  staleTime: 60_000,
  gcTime: 5 * 60_000,
  refetchOnWindowFocus: false,
});

export function useMeQuery() {
  return useQuery(meQueryOptions);
}

export function useLogoutMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await api.post("/auth/logout"); // backend apaga cookie
    },
    onSuccess: async () => {
      qc.setQueryData(["me"], null);
      await qc.invalidateQueries({ queryKey: ["me"] });
    },
  });
}

export function useAuth() {
  const { data, isLoading, error } = useMeQuery();
  return { user: data, isAuthenticated: !!data, isLoading, error };
}
