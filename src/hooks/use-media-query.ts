import { useEffect, useState } from "react";

/**
 * Observa várias media queries de uma só vez.
 * @param queries Lista de media queries CSS.
 * @returns Array de booleans indicando se cada query casou.
 *
 * @example
 * const [isMd, isLg] = useMediaQueries([
 *   "(min-width: 768px)",
 *   "(min-width: 1024px)"
 * ]);
 */
export function useMediaQueries(queries: string[]): boolean[] {
  const [matches, setMatches] = useState<boolean[]>(() => {
    return queries.map((q) => window.matchMedia(q).matches);
  });

  // Recria listeners quando a lista de queries muda (length/valores)
  useEffect(() => {
    const mediaQueryLists = queries.map((q) => window.matchMedia(q));

    const update = () => setMatches(mediaQueryLists.map((mql) => mql.matches));

    // sync inicial
    update();

    // listeners
    mediaQueryLists.forEach((mql) => mql.addEventListener("change", update));

    return () => {
      mediaQueryLists.forEach((mql) => mql.removeEventListener("change", update));
    };
  }, [queries]);

  return matches;
}
