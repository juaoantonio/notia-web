// src/sections/home/demo-section.tsx
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
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
import { TagRotator } from "./tag-rotator";

const tagSets = [
  ["#javascript", "#typescript", "#webdev"],
  ["#fastify", "#postgres", "#zod"],
  ["#uxwriting", "#copy", "#seo"],
  ["#ai", "#embeddings", "#tags"],
];

type DemoSectionProps = { className?: string };

export function DemoSection({ className }: DemoSectionProps) {
  return (
    <section
      id="demo"
      className={cn("mx-auto max-w-7xl px-6 pb-20", className)}
    >
      <div className="grid items-start gap-10">
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
                Cole um link de estudo e receba tags sugeridas automaticamente.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-3">
              <Label htmlFor="demo-url">URL</Label>
              <Input id="demo-url" placeholder="Cole uma URL aqui" />
              {/* Acessibilidade: anuncie mudanças de tags para leitores de tela */}
              <div aria-live="polite">
                <TagRotator sets={tagSets} />
              </div>
            </CardContent>

            <CardFooter className="justify-between gap-3">
              <Button variant="outline">Limpar</Button>
              <Button className="px-6">Gerar tags</Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
