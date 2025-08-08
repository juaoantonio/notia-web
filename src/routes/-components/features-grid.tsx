import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  BrainCircuitIcon,
  BrickWall,
  FolderLock,
  Link as LinkIcon,
  MousePointer,
  Search,
} from "lucide-react";
import { fadeUp, stagger } from "@/helpers/motion";

const items = [
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
];

export function FeaturesGrid() {
  return (
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
        {items.map((f) => (
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
  );
}
