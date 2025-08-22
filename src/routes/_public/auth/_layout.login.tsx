import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";

import { GoogleLoginButton } from "@/components/common/google-login-button.tsx";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/_public/auth/_layout/login")({
  component: LoginPage,
  staticData: {
    breadcrumb: "Login",
    navigable: true,
  },
});

function LoginPage() {
  return (
    <div className="flex w-full max-w-md flex-1 flex-col justify-center space-y-10">
      <motion.div
        className="space-y-4 text-center"
        initial={{ x: -40, opacity: 0 }} // começa 40px à esquerda, invisível
        animate={{ x: 0, opacity: 1 }} // vai para o lugar e aparece
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="text-4xl font-semibold">Login</h1>
        <p className="text-muted-foreground text-sm">
          Entre para organizar seus links de estudo com o Notia.
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
          to={"/auth/register"}
          className="text-muted-foreground block text-center text-xs underline underline-offset-2"
        >
          Cadastre-se
        </Link>
      </motion.div>
    </div>
  );
}
