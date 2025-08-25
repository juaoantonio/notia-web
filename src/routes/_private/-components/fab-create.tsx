import { useEffect, useId, useRef, useState } from "react";

import { FolderPlus, Link2, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "@/components/ui/button";

import type { Variants } from "motion";

/**
 * Botão flutuante com menu de ações.
 * - Abre opções "Criar pasta" e "Criar link" com animações (motion.dev).
 * - Overlay com gradiente escuro quando aberto.
 * - Fecha ao clicar fora ou pressionar Esc.
 *
 * Use os callbacks para integrar navegação/ações reais.
 */
export function FabCreate({
  onCreateFolder,
  onCreateLink,
}: {
  onCreateFolder?: () => void;
  onCreateLink?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuId = useId();

  // Fechar com ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Overlay: só usa opacidade, com easing padrão
  const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.18 } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  };

  // Menu: usa spring via easing: spring(...)
  const menuVariants: Variants = {
    hidden: { opacity: 0, y: 12, scale: 0.96 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.25, ease: "easeOut", type: "spring" },
    },
    exit: {
      opacity: 0,
      y: 10,
      scale: 0.98,
      transition: { duration: 0.12 },
    },
  };

  // Itens com leve stagger: aqui pode usar só duration/delay
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 8 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.04 * i, duration: 0.18 },
    }),
    exit: { opacity: 0, y: 6, transition: { duration: 0.1 } },
  };

  return (
    <>
      {/* Overlay clicável para fechar */}
      <AnimatePresence>
        {open && (
          <motion.button
            aria-label="Fechar menu"
            className="fixed inset-0 z-30 cursor-default bg-gradient-to-t from-black/50 via-black/30 to-transparent backdrop-blur-[1px]"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={overlayVariants}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Área do FAB + menu */}
      <div className="pointer-events-none fixed inset-x-0 bottom-20 z-40 flex flex-col items-end justify-end pr-5">
        {/* Menu flutuante à esquerda do FAB */}
        <AnimatePresence>
          {open && (
            <motion.div
              ref={menuRef}
              role="menu"
              aria-labelledby={menuId}
              className="pointer-events-auto mr-1.5 mb-5 flex flex-col gap-2"
              initial="hidden"
              animate="show"
              exit="exit"
              variants={menuVariants}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Item: Criar pasta */}
              <motion.div
                custom={0}
                variants={itemVariants}
                className="flex items-center justify-end gap-2"
              >
                <span className="bg-background/90 text-foreground ring-border rounded-md px-3 py-1.5 text-sm shadow-sm ring-1">
                  Criar pasta
                </span>
                <Button
                  variant="default"
                  className="h-12 w-12 rounded-full shadow-sm"
                  aria-label="Criar pasta"
                  onClick={() => {
                    setOpen(false);
                    onCreateFolder?.();
                  }}
                >
                  <FolderPlus className="h-5 w-5" />
                </Button>
              </motion.div>

              {/* Item: Criar link */}
              <motion.div
                custom={1}
                variants={itemVariants}
                className="flex items-center justify-end gap-2"
              >
                <span className="bg-background/90 text-foreground ring-border rounded-md px-3 py-1.5 text-sm shadow-sm ring-1">
                  Criar link
                </span>
                <Button
                  variant="secondary"
                  className="h-12 w-12 rounded-full shadow-sm"
                  aria-label="Criar link"
                  onClick={() => {
                    setOpen(false);
                    onCreateLink?.();
                  }}
                >
                  <Link2 className="h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAB */}
        <div className="pointer-events-auto">
          <Button
            id={menuId}
            className="h-15 w-15 rounded-full shadow-sm"
            aria-label={open ? "Fechar menu de criação" : "Abrir menu de criação"}
            aria-expanded={open}
            aria-haspopup="menu"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((v) => !v);
            }}
          >
            <motion.span
              animate={{ rotate: open ? 45 : 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="grid place-items-center"
            >
              <Plus className="min-h-6 min-w-6" />
            </motion.span>
          </Button>
        </div>
      </div>
    </>
  );
}
