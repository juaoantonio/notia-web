import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function NavHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a
          className="group inline-flex items-center gap-2 font-semibold"
          href="#top"
        >
          <img src="/logo.png" alt="Notia Logo" className="w-30" />
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
  );
}
