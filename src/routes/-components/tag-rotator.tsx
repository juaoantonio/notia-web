import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type TagRotatorProps = {
  sets: string[][];
  interval?: number;
  className?: string; // wrapper externo
  innerClassName?: string; // wrapper interno que troca (opcional)
  chipClassName?: string;
  duration?: number;
  staggerIn?: number;
  staggerOut?: number;
};

const list = (staggerIn = 0.06, staggerOut = 0.04) => ({
  initial: {},
  animate: { transition: { staggerChildren: staggerIn } },
  exit: { transition: { staggerChildren: staggerOut, staggerDirection: -1 } },
});

const item = {
  initial: { opacity: 0, y: -12, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 12, scale: 0.98 },
};

export function TagRotator({
  sets,
  interval = 1800,
  className,
  innerClassName,
  chipClassName,
  duration = 0.28,
  staggerIn = 0.06,
  staggerOut = 0.04,
}: TagRotatorProps) {
  const [idx, setIdx] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % sets.length), interval);
    return () => clearInterval(t);
  }, [interval, prefersReduced, sets.length]);

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={idx}
          variants={list(staggerIn, staggerOut)}
          initial="initial"
          animate="animate"
          exit="exit"
          className={cn("flex flex-wrap gap-2", innerClassName)}
        >
          {sets[idx]?.map((t) => (
            <motion.span
              key={`${t}-${idx}`}
              variants={item}
              transition={{ duration, ease: "easeOut" }}
              className={cn(
                "rounded-full bg-primary/10 px-2.5 py-1 text-xs text-primary",
                chipClassName,
              )}
            >
              {t}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
