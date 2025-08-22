import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, Outlet, redirect } from "@tanstack/react-router";
import { Plus, Send, Settings, Wand2, Lock, User2 } from "lucide-react";

import { AnimatedBackground } from "@/components/common/animated-background.tsx";
import { ThemeToggle } from "@/components/theme-toggle.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { cn } from "@/lib/utils.ts";
import { meQueryOptions } from "@/modules/auth/auth.queries.ts";

export const Route = createFileRoute("/_private")({
  beforeLoad: async ({ context, location }) => {
    const me = await context.queryClient.ensureQueryData(meQueryOptions);
    if (!me) {
      throw redirect({
        to: "/auth/login",
        search: { redirect: location.href },
        replace: true,
      });
    }
  },
  component: PrivateLayout,
  staticData: {
    navigable: false,
  },
});

function PrivateLayout() {
  // Usuário no cache (carregado no beforeLoad)
  const { data: me } = useQuery(meQueryOptions);

  return (
    <div className="bg-background text-foreground relative flex min-h-dvh flex-col">
      {/* Fundo animado discreto (mesma linguagem visual da landing) */}
      <AnimatedBackground
        containerClassName="opacity-70"
        bubbles={[
          {
            className: "bg-primary/10 dark:bg-primary/20 h-80 w-80 rounded-full blur-3xl",
            positionClassName: "absolute -top-10 -left-24",
            animate: { x: [0, 16, -10, 0], y: [0, -12, 10, 0], scale: [1, 1.04, 0.97, 1] },
            transition: { duration: 14, repeat: Infinity, ease: "easeInOut" },
          },
          {
            className: "bg-primary/15 dark:bg-primary/25 h-72 w-72 rounded-full blur-3xl",
            positionClassName: "absolute top-64 -right-20",
            animate: { x: [0, -18, 14, 0], y: [0, 12, -12, 0], scale: [1, 1.03, 0.96, 1] },
            transition: { duration: 16, repeat: Infinity, ease: "easeInOut" },
          },
        ]}
      />

      {/* Top App Bar */}
      <header className="bg-background/70 sticky top-0 z-30 border-b backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-screen-md items-center justify-between px-4">
          <div className="flex items-center gap-2">
            {me?.picture ? (
              <img
                src={me.picture}
                alt={me?.name ?? "User"}
                className="h-8 w-8 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="bg-muted text-muted-foreground grid h-8 w-8 place-items-center rounded-full">
                <User2 className="h-4 w-4" />
              </div>
            )}
            <h1 className="text-base font-semibold">{me?.name}</h1>
          </div>

          <div className="flex items-center gap-1">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="mx-auto w-full max-w-screen-md flex-1 px-4 pt-4 pb-24">
        <Outlet />
      </main>

      {/* FAB */}
      <div className="pointer-events-none fixed inset-x-0 bottom-20 z-30 flex justify-end pr-5">
        <Button
          size="icon"
          className="pointer-events-auto rounded-full shadow-sm"
          aria-label="Add item"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      {/* Bottom Tabs */}
      <nav className="bg-background/80 fixed inset-x-0 bottom-0 z-40 border-t backdrop-blur-md">
        <div className="mx-auto grid max-w-screen-md grid-cols-4">
          <TabLink to="/_private/home" icon={Lock} label="My vault" />
          <TabLink to="/_private/send" icon={Send} label="Send" disabled />
          <TabLink to="/_private/generator" icon={Wand2} label="Generator" disabled />
          <TabLink to="/_private/settings" icon={Settings} label="Settings" disabled />
        </div>
        <Separator className="sr-only" />
      </nav>
    </div>
  );
}

type TabProps = {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  disabled?: boolean;
};

function TabLink({ to, icon: Icon, label, disabled }: TabProps) {
  if (disabled) {
    return (
      <div className="text-muted-foreground flex flex-col items-center justify-center gap-1 p-2 py-3 text-xs">
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </div>
    );
  }
  return (
    <Link
      to={to}
      activeOptions={{ exact: true }}
      className="group flex flex-col items-center justify-center gap-1 p-2 py-3 text-xs"
      activeProps={{ className: "text-foreground" }}
      inactiveProps={{ className: "text-muted-foreground" }}
    >
      {({ isActive }) => (
        <>
          <Icon
            className={cn(
              "h-5 w-5",
              isActive ? "opacity-100" : "opacity-80 group-hover:opacity-100",
            )}
          />
          <span className={cn(isActive ? "font-medium" : "font-normal")}>{label}</span>
        </>
      )}
    </Link>
  );
}
