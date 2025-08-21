import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

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
  component: HomeLayout,
  staticData: {
    navigable: false,
  },
});

function HomeLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
