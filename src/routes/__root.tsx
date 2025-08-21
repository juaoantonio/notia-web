import type { ReactNode } from "react";

import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

type BreadcrumbValue =
  | string
  | ReactNode
  | ((params: Record<string, string>) => string | ReactNode);

declare module "@tanstack/react-router" {
  interface StaticDataRouteOption {
    /** Rótulo do breadcrumb (string, ReactNode ou função que usa params) */
    breadcrumb?: BreadcrumbValue;
    navigable?: boolean;
  }
}

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
