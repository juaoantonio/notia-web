import { Separator } from "@/components/ui/separator";

export function SocialProof() {
  return (
    <section className="border-y bg-muted/40">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 px-6 py-8">
        <span className="text-xs text-muted-foreground">
          Confiado por estudantes, concurseiros e professores
        </span>
        <div className="flex items-center gap-6 opacity-70">
          <Separator orientation="vertical" className="h-6" />
          <div className="h-6 w-20 rounded bg-foreground/10" />
          <div className="h-6 w-20 rounded bg-foreground/10" />
          <div className="h-6 w-20 rounded bg-foreground/10" />
          <Separator orientation="vertical" className="h-6" />
        </div>
      </div>
    </section>
  );
}
