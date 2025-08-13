import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fadeUp, stagger } from "@/helpers/motion";
import { SectionBadge } from "@/components/session-badge.tsx";
import { TagRotator } from "@/routes/-components/tag-rotator.tsx";

const tagSets = [
  ["#javascript", "#typescript", "#webdev"],
  ["#fastify", "#postgres", "#zod"],
  ["#uxwriting", "#copy", "#seo"],
  ["#ai", "#embeddings", "#tags"],
];

export function HeroSection() {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const heroBlur = useTransform(scrollYProgress, [0, 0.3], ["40px", "6px"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.6]);

  return (
    <motion.section
      id="top"
      className="relative overflow-hidden"
      initial="initial"
      animate="animate"
      variants={stagger}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          opacity: prefersReduced ? 1 : heroOpacity,
          filter: prefersReduced ? undefined : `blur(${heroBlur.get()})`,
        }}
      >
        <div className="mx-auto h-[520px] max-w-7xl bg-primary/10 blur-2xl" />
      </motion.div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-20 pt-16 md:grid-cols-2 md:pt-24">
        <motion.div
          className="space-y-6"
          variants={fadeUp}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
        >
          <SectionBadge>Organizador de estudos com IA</SectionBadge>
          <h1 className="text-balance text-4xl font-bold tracking-tighter leading-tight md:text-5xl">
            Salve, organize e compartilhe{" "}
            <span className="text-primary">seus links de estudo</span> em
            segundos
          </h1>
          <p className="text-pretty text-base text-muted-foreground md:text-lg">
            O Notia usa IA para sugerir tags automaticamente, mantém suas pastas
            privadas por padrão e permite compartilhar o que for público com um
            link de leitura — rápido, seguro e sem fricção.
          </p>
          <div className="flex flex-col items-start gap-3 sm:flex-row">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="px-6">Começar grátis</Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="outline" className="px-6" asChild>
                <a href="#demo">Ver demo</a>
              </Button>
            </motion.div>
          </div>
          <motion.ul
            className="mt-2 grid max-w-md grid-cols-1 gap-2 text-sm text-muted-foreground"
            variants={stagger}
          >
            {[
              "Pastas privadas por padrão",
              "Tags por IA (título + descrição)",
              "Compartilhamento revogável",
            ].map((li) => (
              <motion.li key={li} variants={fadeUp}>
                • {li}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          variants={fadeUp}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
        >
          <Card className="relative">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-primary">
                  <img
                    src="/logo-responsive.png"
                    alt="Notia Logo"
                    className="w-6"
                  />
                </span>
                <CardTitle className="text-base">Pasta: Algoritmos</CardTitle>
              </div>
              <CardDescription>Privada</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <div className="grid gap-2">
                <Label htmlFor="url">URL</Label>
                <Input id="url" placeholder="https://..." />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="title">Título</Label>
                <Input id="title" placeholder="Artigo sobre Tries" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="desc">Descrição</Label>
                <textarea
                  id="desc"
                  className="min-h-24 rounded-md border border-input bg-background p-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Notas rápidas..."
                />
              </div>

              <TagRotator sets={tagSets} />
            </CardContent>
            <CardFooter className="justify-end">
              <Button className="px-6">Salvar link</Button>
            </CardFooter>
            <div
              aria-hidden
              className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-primary/20 blur-2xl"
            />
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
}
