import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";

import { GoogleLoginButton } from "@/components/common/google-login-button.tsx";
import { Separator } from "@/components/ui/separator.tsx";

export const Route = createFileRoute("/_public/auth/_layout/register")({
  component: RegisterPage,
  staticData: {
    navigable: true,
    breadcrumb: "Cadastro",
  },
});

function RegisterPage() {
  return (
    <div className="flex w-full max-w-md flex-1 flex-col justify-center space-y-10">
      <motion.div
        className="space-y-4 text-center"
        initial={{ x: -40, opacity: 0 }} // começa 40px à esquerda, invisível
        animate={{ x: 0, opacity: 1 }} // vai para o lugar e aparece
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="text-4xl font-semibold">Cadastro</h1>
        <p className="text-muted-foreground text-sm">
          Cadastre-se para organizar seus links de estudo com o Notia.
        </p>
      </motion.div>

      <motion.div
        className="space-y-6"
        initial={{ x: -40, opacity: 0 }} // começa 40px à esquerda, invisível
        animate={{ x: 0, opacity: 1 }} // vai para o lugar e aparece
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      >
        <GoogleLoginButton className="bg-background h-11 w-full items-center justify-center gap-3" />

        <div className="relative">
          <Separator />
          <span className="bg-background text-muted-foreground absolute -top-3 left-1/2 -translate-x-1/2 px-2 text-xs">
            ou
          </span>
        </div>

        <Link
          to={"/auth/login"}
          className="text-muted-foreground block text-center text-xs underline underline-offset-2"
        >
          Faça login
        </Link>
      </motion.div>
    </div>
  );
}
