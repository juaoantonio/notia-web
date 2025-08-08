import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection() {
  return (
    <section id="faq" className="mx-auto max-w-5xl px-6 pb-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Perguntas frequentes
        </h2>
        <p className="mt-3 text-muted-foreground">
          Tire dúvidas comuns antes de começar.
        </p>
      </div>

      <Accordion type="single" collapsible className="mx-auto mt-10 max-w-3xl">
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
  );
}
