import { useMemo } from "react";

import { useResponsiveValue } from "./use-responsive";

export const DEFAULT_BREAKPOINTS = {
  sm: "(min-  width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  "2xl": "(min-width: 1536px)",
} as const;

type Keys = keyof typeof DEFAULT_BREAKPOINTS;

/**
 * Açúcar para breakpoints (sm, md, lg, xl, 2xl).
 * O maior breakpoint ativo definido em `values` vence.
 * @template T Tipo do valor.
 * @param base Valor padrão antes de qualquer breakpoint.
 * @param values Valores opcionais por breakpoint.
 * @param map Override opcional de queries CSS.
 * @returns Valor resolvido pelo breakpoint atual.
 *
 * @example
 * const bubbles = useBreakpointValue<BubbleConfig[]>({
 *   base: baseConfig,
 *   values: { md: mdConfig, lg: lgConfig },
 * });
 */
export function useBreakpointValue<T>({
  base,
  values = {},
  map = {},
}: {
  base: T;
  values?: Partial<Record<Keys, T>>;
  map?: Partial<Record<Keys, string>>; // permite customizar queries
}): T {
  const ordered = useMemo(
    () =>
      (["sm", "md", "lg", "xl", "2xl"] as Keys[])
        .filter((k) => k in values)
        .map((k) => ({
          query: map[k] ?? DEFAULT_BREAKPOINTS[k],
          value: values[k] as T,
        })),
    [values, map],
  );

  return useResponsiveValue<T>({ base, queries: ordered });
}
