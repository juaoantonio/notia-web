import { useMemo } from "react";

import { useMediaQueries } from "@/hooks/use-media-query.ts";

/**
 * Retorna um valor baseado em media queries.
 * O último match da lista vence; se nenhum casar, retorna `base`.
 * @template T Tipo do valor.
 * @param base Valor padrão.
 * @param queries Lista opcional de pares `{ query, value }`.
 * @returns Valor resolvido conforme as queries ativas.
 *
 * @example
 * const layout = useResponsiveValue({
 *   base: "compact",
 *   queries: [
 *     { query: "(min-width: 768px)", value: "cozy" },
 *     { query: "(min-width: 1024px)", value: "spacious" },
 *   ],
 * });
 */
export function useResponsiveValue<T>({
  base,
  queries = [],
}: {
  base: T;
  queries?: Array<{ query: string; value: T }>;
}): T {
  // strings das queries, memoizadas
  const queryStrings = useMemo(() => queries.map((q) => q.query), [queries]);

  // um ÚNICO hook que observa todas
  const matched = useMediaQueries(queryStrings);

  // escolhe o último que casa
  return useMemo(() => {
    let value = base;
    for (let i = 0; i < queries.length; i++) {
      if (matched[i]) value = queries[i]!.value;
    }
    return value;
  }, [base, matched, queries]);
}
