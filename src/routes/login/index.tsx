import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeftIcon } from "lucide-react";

import { GoogleLoginButton } from "@/components/common/google-login-button.tsx";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/login/")({
  component: LoginPage,
});

const HERO_IMG = "/splash.png";

function LoginPage() {
  return (
    <main className="bg-background flex h-dvh w-dvw items-stretch">
      <section className="grid flex-1 grid-cols-1 lg:grid-cols-2">
        {/* Coluna esquerda: Área de login */}
        <div className="bg-background flex flex-col items-center justify-center p-6 lg:p-12">
          <Link to={".."} className={"top-20 left-20 flex w-min gap-2 self-start"}>
            <ChevronLeftIcon />
            Voltar
          </Link>

          <div className="flex w-full max-w-md flex-1 flex-col justify-center space-y-6">
            <div className="mb-6 space-y-4 text-center">
              <h1 className="text-4xl font-semibold">Login</h1>
              <p className="text-muted-foreground text-sm">
                Entre para organizar seus links de estudo com o Notia.
              </p>
            </div>

            <div className="space-y-6">
              <GoogleLoginButton className="bg-background h-11 w-full items-center justify-center gap-3" />

              <div className="relative">
                <Separator />
                <span className="bg-background text-muted-foreground absolute -top-3 left-1/2 -translate-x-1/2 px-2 text-xs">
                  ou
                </span>
              </div>

              <div className="text-muted-foreground text-center text-xs">
                Outros métodos em breve
              </div>
            </div>
          </div>
        </div>

        {/* Coluna direita: painel visual preenchido */}
        <aside className="relative hidden overflow-hidden lg:block">
          <img
            src={HERO_IMG}
            alt="Ilustração de estudo/organização"
            className="h-full w-full object-cover"
          />
          <div
            className="from-primary/10 via-primary/20 to-primary/30 absolute inset-0 bg-gradient-to-br"
            aria-hidden
          />
          <div
            className="bg-primary/20 absolute -top-8 -left-8 h-40 w-40 rounded-full blur-2xl"
            aria-hidden
          />
          <div
            className="bg-primary/20 absolute -right-10 -bottom-10 h-48 w-48 rounded-full blur-2xl"
            aria-hidden
          />
        </aside>
      </section>
    </main>
  );
}
