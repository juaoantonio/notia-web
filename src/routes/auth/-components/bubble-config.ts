// Base (mobile) — leve, sem invadir demais a área útil
import type { BubbleConfig } from "@/routes/-components/animated-background.tsx";

export const bubblesBase: BubbleConfig[] = [
  // topo/esquerda
  {
    className: "bg-primary/30 h-48 w-48 rounded-full blur-2xl",
    positionClassName: "absolute top-0 left-20",
    animate: {
      x: ["0vw", "40vw", "10vw", "80vw", "0vw"],
      y: ["0vh", "20vh", "80vh", "40vh", "0vh"],
      scale: [1, 1.2, 0.8, 1.1, 1],
    },
    transition: { duration: 40, repeat: Infinity, ease: "easeInOut" },
  },

  // centro
  {
    className: "bg-primary/25 dark:bg-blue-400/20 h-40 w-40 rounded-full blur-2xl",
    positionClassName: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
    animate: {
      x: ["0vw", "-30vw", "20vw", "-10vw", "0vw"],
      y: ["0vh", "30vh", "-30vh", "20vh", "0vh"],
      scale: [1, 1.15, 0.9, 1.1, 1],
    },
    transition: { duration: 50, repeat: Infinity, ease: "easeInOut" },
  },

  // base/direita
  {
    className: "bg-primary/35 dark:bg-blue-500/20 h-52 w-52 rounded-full blur-2xl",
    positionClassName: "absolute bottom-10 right-0",
    animate: {
      x: ["0vw", "-20vw", "-60vw", "-30vw", "0vw"],
      y: ["0vh", "-20vh", "-60vh", "-10vh", "0vh"],
      scale: [1, 1.1, 0.95, 1.2, 1],
    },
    transition: { duration: 45, repeat: Infinity, ease: "easeInOut" },
  },
];

// LG (desktop) — seu layout completo de 5 zonas
export const bubblesLg: BubbleConfig[] = [
  // ZONA 1 — topo/esquerda
  {
    className: "bg-primary/30 h-[28rem] w-[28rem] rounded-full blur-3xl",
    positionClassName: "absolute top-[8vh] -left-40",
    animate: {
      x: ["0vw", "8vw", "4vw", "0vw"],
      y: ["0vh", "-6vh", "4vh", "0vh"],
      scale: [1, 1.07, 0.95, 1],
    },
    transition: { duration: 28, repeat: Infinity, ease: "easeInOut" },
  },
  // ZONA 2 — base/esquerda
  {
    className: "bg-primary/45 dark:bg-blue-500/15 h-80 w-80 rounded-full blur-2xl",
    positionClassName: "absolute bottom-[10vh] left-[2vw]",
    animate: {
      x: ["0vw", "6vw", "2vw", "0vw"],
      y: ["0vh", "-5vh", "3vh", "0vh"],
      scale: [1, 1.05, 0.97, 1],
    },
    transition: { duration: 30, repeat: Infinity, ease: "easeInOut" },
  },
  // ZONA 3 — centro controlado
  {
    className: "bg-primary/40 dark:bg-blue-400/20 h-[24rem] w-[24rem] rounded-full blur-3xl",
    positionClassName: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
    animate: {
      x: ["0vw", "3vw", "-3vw", "0vw"],
      y: ["0vh", "2vh", "-2vh", "0vh"],
      scale: [1, 1.06, 0.94, 1],
    },
    transition: { duration: 32, repeat: Infinity, ease: "easeInOut" },
  },
  // ZONA 4 — topo/direita
  {
    className: "bg-primary/50 h-72 w-72 rounded-full blur-3xl",
    positionClassName: "absolute top-[18vh] -right-28",
    animate: {
      x: ["0vw", "-8vw", "-5vw", "0vw"],
      y: ["0vh", "6vh", "-5vh", "0vh"],
      scale: [1, 1.04, 0.98, 1],
    },
    transition: { duration: 26, repeat: Infinity, ease: "easeInOut" },
  },
  // ZONA 5 — borda inferior direita
  {
    className: "bg-primary/40 dark:bg-blue-500/20 h-[26rem] w-[26rem] rounded-full blur-3xl",
    positionClassName: "absolute bottom-[8vh] right-[2vw]",
    animate: {
      x: ["0vw", "-7vw", "-3vw", "0vw"],
      y: ["0vh", "-5vh", "3vh", "0vh"],
      scale: [1, 1.05, 0.97, 1],
    },
    transition: { duration: 27, repeat: Infinity, ease: "easeInOut" },
  },
];
