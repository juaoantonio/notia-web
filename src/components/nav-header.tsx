import { Link } from "@tanstack/react-router";

import { AutoBreadcrumb } from "@/components/common/auto-breadcrumb.tsx";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export function NavHeader() {
  return (
    <header className="bg-background/70 sticky top-0 z-50 border-b backdrop-blur">
      <AutoBreadcrumb rootPath={"/"} />
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a className="group inline-flex items-center gap-2 font-semibold" href="#top">
          <img src="/logo.png" alt="Notia Logo" className="w-30" />
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          <a className="text-muted-foreground hover:text-foreground text-sm" href="#features">
            Recursos
          </a>
          <a className="text-muted-foreground hover:text-foreground text-sm" href="#demo">
            Demo
          </a>
          <a className="text-muted-foreground hover:text-foreground text-sm" href="#pricing">
            Preços
          </a>
          <a className="text-muted-foreground hover:text-foreground text-sm" href="#faq">
            FAQ
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            className="text-muted-foreground hover:text-foreground hidden text-sm md:inline"
            to={"/auth/login"}
          >
            Entrar
          </Link>
          <ThemeToggle />

          <Button asChild className="px-5">
            <Link to={"/auth/register"}>Criar Conta</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
