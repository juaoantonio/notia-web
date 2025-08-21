import { useEffect, useMemo, useState } from "react";

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
  const signature = useMemo(() => queries.join("|"), [queries]);

  const [matches, setMatches] = useState(() => queries.map((q) => window.matchMedia(q).matches));

  useEffect(() => {
    const mqls = queries.map((q) => window.matchMedia(q));
    const update = () => {
      const next = mqls.map((mql) => mql.matches);
      setMatches((prev) => {
        for (let i = 0; i < prev.length; i++) {
          if (prev[i] !== next[i]) return next;
        }
        return prev; // evita re-render inútil
      });
    };

    update();
    mqls.forEach((mql) => mql.addEventListener("change", update));

    return () => {
      mqls.forEach((mql) => mql.removeEventListener("change", update));
    };
  }, [queries, signature]);

  return matches;
}
