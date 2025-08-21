import type { CSSProperties } from "react";

import { motion, type Transition } from "motion/react";

import { cn } from "@/lib/utils";

export type BubbleConfig = {
  /** Classes visuais da bolha (ex: bg-…, h-…, w-…, rounded-full, blur-…) */
  className?: string;
  /** Classes de posição (ex: "absolute top-40 -left-40"). */
  positionClassName?: string;
  /** Estilos extras (caso prefira width/height em px, etc.) */
  style?: CSSProperties;
  /** Keyframes da animação */
  animate?: {
    x?: (number | string)[];
    y?: (number | string)[];
    scale?: number[];
  };
  /** Transição do motion */
  transition?: Transition;
};

export interface AnimatedBackgroundProps {
  /** Lista de bolhas (se vazio, usa os padrões do snippet original) */
  bubbles?: BubbleConfig[];
  /** Mostra gradiente superior (default: true) */
  gradient?: boolean;
  /** Mostra textura sutil (default: true) */
  showTexture?: boolean;
  /** Classes adicionais para o contêiner (mescladas com os padrões) */
  containerClassName?: string;
}

/** === Padrões iguais ao snippet fornecido === */
export const DEFAULT_BUBBLES: BubbleConfig[] = [
  {
    className: "bg-primary/15 dark:bg-primary/30 h-96 w-96 rounded-full blur-3xl",
    positionClassName: "absolute top-40 -left-40",
    animate: {
      x: [0, 20, -15, 0],
      y: [0, -15, 10, 0],
      scale: [1, 1.05, 0.97, 1],
    },
    transition: { duration: 12, repeat: Infinity, ease: "easeInOut" },
  },
  {
    className: "bg-primary/20 dark:bg-primary/40 h-96 w-96 rounded-full blur-3xl",
    positionClassName: "absolute top-96 right-0",
    animate: {
      x: [0, -20, 15, 0],
      y: [0, 10, -15, 0],
      scale: [1, 1.04, 0.96, 1],
    },
    transition: { duration: 14, repeat: Infinity, ease: "easeInOut" },
  },
];

export function AnimatedBackground({
  bubbles = DEFAULT_BUBBLES,
  gradient = true,
  showTexture = true,
  containerClassName,
}: AnimatedBackgroundProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 -z-10", // padrão do seu snippet
        containerClassName,
      )}
    >
      {/* Gradiente de topo */}
      {gradient && (
        <div className="from-primary/10 absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b via-transparent to-transparent" />
      )}

      {/* Bolhas */}
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          className={cn(b.positionClassName ?? "absolute", b.className)}
          style={b.style}
          animate={b.animate}
          transition={b.transition}
        />
      ))}

      {/* Textura sutil */}
      {showTexture && (
        <div className="bg-[radial-gradient(circle_at_1px_1px,theme(colors.primary/5)_1px,transparent_0)] absolute inset-0 bg-[size:40px_40px] opacity-20" />
      )}
    </div>
  );
}
