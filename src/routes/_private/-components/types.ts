import type { ComponentType } from "react";

export type TabItem = {
  to: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  disabled?: boolean;
};
