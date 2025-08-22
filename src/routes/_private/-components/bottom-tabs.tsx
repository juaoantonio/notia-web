import { Separator } from "@/components/ui/separator";
import { TabLink } from "@/routes/_private/-components/tab-link.tsx";
import type { TabItem } from "@/routes/_private/-components/types.ts";

type Props = { items: TabItem[] };

export function BottomTabs({ items }: Props) {
  return (
    <nav className="bg-background/80 fixed inset-x-0 bottom-0 z-40 border-t backdrop-blur-md">
      <div className="mx-auto grid max-w-screen-md grid-cols-4">
        {items.map((it) => (
          <TabLink key={it.label} {...it} />
        ))}
      </div>
      <Separator className="sr-only" />
    </nav>
  );
}
