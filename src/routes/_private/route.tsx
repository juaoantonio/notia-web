import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet, redirect, useNavigate } from "@tanstack/react-router";
import { Send, Settings, Wand2, Lock } from "lucide-react";

import { meQueryOptions, useAuth } from "@/modules/auth/auth.queries.ts";
import { TopAppBar } from "@/routes/_private/-components/app-top-bar.tsx";
import { BottomTabs } from "@/routes/_private/-components/bottom-tabs.tsx";
import { FabCreate } from "@/routes/_private/-components/fab-create.tsx";
import type { TabItem } from "@/routes/_private/-components/types.ts";

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

export function PrivateLayout() {
  const { data: me } = useQuery(meQueryOptions);
  const { isAuthenticated, isPending } = useAuth();
  const navigate = useNavigate();

  const tabs: TabItem[] = [
    { to: "/home", icon: Lock, label: "Meu cofre" },
    { to: "/home", icon: Send, label: "Enviar", disabled: true },
    { to: "/home", icon: Wand2, label: "Gerador", disabled: true },
    { to: "/settings", icon: Settings, label: "Configurações" },
  ];

  useEffect(() => {
    if (!isPending && !isAuthenticated) {
      navigate({
        to: "/auth/login",
        replace: true,
      });
    }
  }, [isPending, isAuthenticated, navigate]);

  return (
    <div className="bg-background text-foreground relative flex min-h-dvh flex-col">
      <TopAppBar
        title={me?.name ?? "My vault"}
        avatarUrl={me?.picture}
        avatarAlt={me?.name ?? "User"}
      />

      <main className="mx-auto w-full max-w-screen-md flex-1 px-4 pt-4 pb-24">
        <Outlet />
      </main>

      <FabCreate
        onCreateFolder={() => navigate({ to: "/folders/new" })}
        onCreateLink={() => navigate({ to: "/folders/new" })}
      />
      <BottomTabs items={tabs} />
    </div>
  );
}
