import * as React from "react";

import { Button } from "@/components/ui/button";

type Props = React.ComponentProps<typeof Button> & {};

/**
 * Dispara o fluxo OAuth no backend.
 * Por padrão, redireciona para /api/auth/google/login (ajuste ao seu backend).
 */
export function GoogleLoginButton({ className, ...props }: Props) {
  const loginPath = import.meta.env.DEV ? "/auth/dev-login" : "/auth/google/login";
  return (
    <Button type="button" className={className} variant="outline" asChild {...props}>
      <a href={`${import.meta.env.VITE_API_URL}${loginPath}`} rel="noopener noreferrer">
        <img src={"/google.svg"} className={"h-4"} alt={"Logo Google"} />
        <span>Entrar com Google</span>
      </a>
    </Button>
  );
}
