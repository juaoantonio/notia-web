import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fadeUp, stagger } from "@/helpers/motion";

export function PricingSection() {
  return (
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
              <CardDescription>Para quem quer tudo ilimitado.</CardDescription>
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
  );
}
