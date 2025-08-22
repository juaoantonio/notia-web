import type { ComponentType } from "react";

import type { LinkProps } from "@tanstack/react-router";

export type TabItem = {
  to: LinkProps["to"];
  label: string;
  icon: ComponentType<{ className?: string }>;
  disabled?: boolean;
};
