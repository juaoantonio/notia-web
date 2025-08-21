import { createFileRoute, Outlet } from "@tanstack/react-router";

import { AnimatedBackground } from "@/components/common/animated-background.tsx";
import { AutoBreadcrumb } from "@/components/common/auto-breadcrumb.tsx";
import { useBreakpointValue } from "@/hooks/use-breakpoint-value.ts";
import { AsideLogoPanel } from "@/routes/auth/-components/aside-logo-panel.tsx";
import { bubblesBase, bubblesLg } from "@/routes/auth/-components/bubble-config.ts";

export const Route = createFileRoute("/auth/_layout")({
  component: AuthLayout,
  staticData: {
    navigable: false,
  },
});

function AuthLayout() {
  const bubbleConfig = useBreakpointValue({
    base: bubblesBase,
    values: {
      lg: bubblesLg,
    },
  });

  return (
    <main className="relative flex h-dvh w-dvw items-center justify-center overflow-hidden lg:px-10">
      <AnimatedBackground bubbles={bubbleConfig} />
      <section className="mx-auto grid h-full flex-1 grid-cols-1 overflow-hidden drop-shadow-2xl lg:h-180 lg:max-w-320 lg:grid-cols-2 lg:rounded lg:border">
        {/* Coluna esquerda: Área de login */}
        <div className="bg-background/30 lg:bg-background flex flex-col items-center justify-center p-6 lg:p-12">
          <AutoBreadcrumb className={"self-start"} />
          <Outlet />
        </div>

        {/* Coluna direita: painel visual preenchido */}
        <AsideLogoPanel />
      </section>
    </main>
  );
}
