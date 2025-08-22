import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { meQueryOptions } from "@/modules/auth/auth.queries.ts";

export const Route = createFileRoute("/_public")({
  beforeLoad: async ({ context, location }) => {
    const me = await context.queryClient.ensureQueryData(meQueryOptions);
    if (me) {
      throw redirect({
        to: "/home",
        search: { redirect: location.href },
        replace: true,
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
