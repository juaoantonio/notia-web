import { createFileRoute } from "@tanstack/react-router";
import { type ReactNode, useEffect, useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { fadeUp, stagger } from "@/helpers/motion.ts";
import {
  BrainCircuitIcon,
  BrickWall,
  FolderLock,
  Link as LinkIcon,
  MousePointer,
  Search,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle.tsx";

export const Route = createFileRoute("/")({
  component: Index,
});

/* Logo minimalista */
function NotiaLogo({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect
        x="4"
        y="4"
        width="40"
        height="40"
        rx="10"
        fill="currentColor"
        opacity="0.08"
      />
      <path d="M14 30V14h6l14 14v6H28L14 20v10z" fill="currentColor" />
    </svg>
  );
}

function SectionBadge({ children }: { children: ReactNode }) {
  return (
    <Badge className="rounded-full bg-muted text-muted-foreground">
      {children}
    </Badge>
  );
}

const tagsList = {
  initial: {},
  animate: { transition: { staggerChildren: 0.06 } },
  exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

const tagItem = {
  initial: { opacity: 0, y: -12, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 12, scale: 0.98 },
};

function Index() {
  // Mini demo: rotaciona sugestões de tags
  const tagSets = [
    ["#javascript", "#typescript", "#webdev"],
    ["#fastify", "#postgres", "#zod"],
    ["#uxwriting", "#copy", "#seo"],
    ["#ai", "#embeddings", "#tags"],
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % tagSets.length), 1800);
    return () => clearInterval(t);
  }, []);

  // Motion: acessibilidade e animações ligadas ao scroll
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const heroBlur = useTransform(scrollYProgress, [0, 0.3], ["40px", "6px"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.6]);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a
            className="group inline-flex items-center gap-2 font-semibold"
            href="#top"
          >
            <span className="text-primary">
              <NotiaLogo className="size-5" />
            </span>
            <span>Notia</span>
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            <a
              className="text-sm text-muted-foreground hover:text-foreground"
              href="#features"
            >
              Recursos
            </a>
            <a
              className="text-sm text-muted-foreground hover:text-foreground"
              href="#demo"
            >
              Demo
            </a>
            <a
              className="text-sm text-muted-foreground hover:text-foreground"
              href="#pricing"
            >
              Preços
            </a>
            <a
              className="text-sm text-muted-foreground hover:text-foreground"
              href="#faq"
            >
              FAQ
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <a
              className="hidden text-sm text-muted-foreground hover:text-foreground md:inline"
              href="#login"
            >
              Entrar
            </a>
            <ThemeToggle />
            <Button className="px-5">Criar conta</Button>
          </div>
        </div>
      </header>

      {/* HERO (com Motion) */}
      <motion.section
        id="top"
        className="relative overflow-hidden"
        initial="initial"
        animate="animate"
        variants={stagger}
      >
        {/* Background decor reativo ao scroll */}
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
          {/* Coluna de texto (entrada + microinterações) */}
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
              O Notia usa IA para sugerir tags automaticamente, mantém suas
              pastas privadas por padrão e permite compartilhar o que for
              público com um link de leitura — rápido, seguro e sem fricção.
            </p>

            <div className="flex flex-col items-start gap-3 sm:flex-row">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="px-6">Começar grátis</Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
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

          {/* Mock do app com Card + Inputs (entrada) */}
          <motion.div
            variants={fadeUp}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          >
            <Card className="relative">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-primary">
                    <NotiaLogo className="size-5" />
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
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={idx} // força ciclo: antigo faz exit, novo faz enter
                    variants={tagsList}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="flex gap-2"
                  >
                    {tagSets[idx].map((t) => (
                      <motion.span
                        key={`${t}-${idx}`} // garante keys únicas em cada ciclo
                        variants={tagItem}
                        transition={{ duration: 0.28, ease: "easeOut" }}
                        className="rounded-full bg-primary/10 px-2.5 py-1 text-xs text-primary"
                      >
                        {t}
                      </motion.span>
                    ))}
                  </motion.div>
                </AnimatePresence>
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

      {/* PROVAS SOCIAIS */}
      <section className="border-y bg-muted/40">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 px-6 py-8">
          <span className="text-xs text-muted-foreground">
            Confiado por estudantes, concurseiros e professores
          </span>
        </div>
      </section>

      {/* FEATURES (revela ao entrar + stagger) */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Feito para estudar melhor
          </h2>
          <p className="mt-3 text-muted-foreground">
            Velocidade, organização e privacidade — com IA para acelerar o que
            importa.
          </p>
        </div>

        <motion.div
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-10% 0px" }}
          variants={stagger}
        >
          {[
            {
              icon: BrainCircuitIcon,
              title: "Tags por IA",
              desc: "Analisamos título e descrição para sugerir tags automaticamente.",
            },
            {
              icon: FolderLock,
              title: "Pastas privadas",
              desc: "Tudo começa privado. Torne público apenas o que você quiser.",
            },
            {
              icon: LinkIcon,
              title: "Compartilhar com link",
              desc: "Crie um link só de leitura e revogue quando precisar.",
            },
            {
              icon: Search,
              title: "Busca rápida",
              desc: "Encontre por título, descrição ou tag instantaneamente.",
            },
            {
              icon: MousePointer,
              title: "Desempenho",
              desc: "Interações fluídas, UI responsiva e feedback imediato.",
            },
            {
              icon: BrickWall,
              title: "Segurança",
              desc: "Criptografia em repouso e TLS em trânsito.",
            },
          ].map((f) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              transition={{ duration: 0.35 }}
            >
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex rounded-md bg-primary/10 p-3 text-primary">
                    <f.icon className="size-6" />
                  </div>
                  <CardTitle className="text-lg">{f.title}</CardTitle>
                  <CardDescription className="mt-1.5">{f.desc}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* DEMO com Tabs */}
      <section id="demo" className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          >
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Veja a IA em ação</CardTitle>
                <CardDescription>
                  Cole um link de estudo e receba tags sugeridas
                  automaticamente.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                <Label htmlFor="demo-url">URL</Label>
                <Input id="demo-url" placeholder="Cole uma URL aqui" />
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={idx} // força ciclo: antigo faz exit, novo faz enter
                    variants={tagsList}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="flex gap-2"
                  >
                    {tagSets[idx].map((t) => (
                      <motion.span
                        key={`${t}-${idx}`} // garante keys únicas em cada ciclo
                        variants={tagItem}
                        transition={{ duration: 0.28, ease: "easeOut" }}
                        className="rounded-full bg-primary/10 px-2.5 py-1 text-xs text-primary"
                      >
                        {t}
                      </motion.span>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </CardContent>
              <CardFooter className="justify-end">
                <Button className="px-6">Gerar tags</Button>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 18,
              delay: 0.1,
            }}
          >
            <Tabs defaultValue="boas-praticas" className="max-w-xl">
              <TabsList>
                <TabsTrigger value="boas-praticas">Boas práticas</TabsTrigger>
                <TabsTrigger value="acessibilidade">Acessibilidade</TabsTrigger>
              </TabsList>
              <TabsContent
                value="boas-praticas"
                className="mt-4 text-sm text-muted-foreground"
              >
                Headline objetiva, subheadline de apoio e CTA visível aumentam a
                chance de rolagem e conversão.
              </TabsContent>
              <TabsContent
                value="acessibilidade"
                className="mt-4 text-sm text-muted-foreground"
              >
                Use contraste suficiente e estados de foco claros para navegação
                por teclado.
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Preços simples
          </h2>
          <p className="mt-3 text-muted-foreground">
            Plano gratuito para começar. Atualize quando precisar de mais.
          </p>
        </div>

        <motion.div
          className="mt-10 grid gap-6 md:grid-cols-2"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Grátis</CardTitle>
                <CardDescription>
                  Para começar a organizar seus estudos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">R$0</div>
                <ul className="mt-4 space-y-2 text-sm">
                  <li>• Até 50 links</li>
                  <li>• Até 5 pastas</li>
                  <li>• Tags por IA</li>
                  <li>• Pastas privadas</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Criar conta</Button>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Card className="relative shadow-sm ring-1 ring-primary">
              <span className="absolute -top-3 right-6 rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                Mais popular
              </span>
              <CardHeader>
                <CardTitle>Premium</CardTitle>
                <CardDescription>
                  Para quem quer tudo ilimitado.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">
                  R$29
                  <span className="text-base font-normal text-muted-foreground">
                    /mês
                  </span>
                </div>
                <ul className="mt-4 space-y-2 text-sm">
                  <li>• Links e pastas ilimitados</li>
                  <li>• Backup em nuvem</li>
                  <li>• Estatísticas de cliques</li>
                  <li>• Exportação (PDF/Excel)</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Assinar agora</Button>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Planos institucionais para escolas e universidades.
        </p>
      </section>

      {/* FAQ com Accordion */}
      <section id="faq" className="mx-auto max-w-5xl px-6 pb-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Perguntas frequentes
          </h2>
          <p className="mt-3 text-muted-foreground">
            Tire dúvidas comuns antes de começar.
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="mx-auto mt-10 max-w-3xl"
        >
          <AccordionItem value="q1">
            <AccordionTrigger>Minhas pastas são privadas?</AccordionTrigger>
            <AccordionContent>
              Sim. Tudo é privado por padrão. Você escolhe o que tornar público.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q2">
            <AccordionTrigger>Como funcionam as tags por IA?</AccordionTrigger>
            <AccordionContent>
              Usamos título + descrição do link para sugerir tags relevantes
              automaticamente.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q3">
            <AccordionTrigger>Posso compartilhar pastas?</AccordionTrigger>
            <AccordionContent>
              Sim. Pastas públicas geram um link somente leitura que você pode
              revogar.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q4">
            <AccordionTrigger>Existe modo offline (PWA)?</AccordionTrigger>
            <AccordionContent>
              Está no roadmap. No Premium, você terá acesso antecipado quando
              lançarmos.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* CTA FINAL (com Motion) */}
      <motion.section
        id="cta"
        className="border-t bg-muted/50"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
      >
        <div className="mx-auto grid max-w-7xl items-center gap-6 px-6 py-14 md:grid-cols-2">
          <div>
            <h3 className="text-2xl font-bold">
              Organize seus estudos com o Notia
            </h3>
            <p className="mt-2 text-muted-foreground">
              Comece grátis hoje. Leva menos de 1 minuto.
            </p>
          </div>
          <div className="flex justify-start md:justify-end">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="px-6">Criar conta</Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <span className="text-primary">
              <NotiaLogo className="size-4" />
            </span>
            <span>Notia © {new Date().getFullYear()}</span>
          </div>
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#privacy" className="hover:text-foreground">
              Privacidade
            </a>
            <a href="#terms" className="hover:text-foreground">
              Termos
            </a>
            <a href="#contact" className="hover:text-foreground">
              Contato
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
