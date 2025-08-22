import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Send, Settings, Wand2, Lock } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle.tsx";
import { meQueryOptions } from "@/modules/auth/auth.queries.ts";
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

  const tabs: TabItem[] = [
    { to: "/_private/home", icon: Lock, label: "My vault" },
    { to: "/_private/send", icon: Send, label: "Send", disabled: true },
    { to: "/_private/generator", icon: Wand2, label: "Generator", disabled: true },
    { to: "/_private/settings", icon: Settings, label: "Settings", disabled: true },
  ];

  return (
    <div className="bg-background text-foreground relative flex min-h-dvh flex-col">
      <TopAppBar
        title={me?.name ?? "My vault"}
        avatarUrl={me?.picture}
        avatarAlt={me?.name ?? "User"}
        rightSlot={<ThemeToggle />}
      />

      <main className="mx-auto w-full max-w-screen-md flex-1 px-4 pt-4 pb-24">
        <Outlet />
      </main>

      <FabCreate />
      <BottomTabs items={tabs} />
    </div>
  );
}
