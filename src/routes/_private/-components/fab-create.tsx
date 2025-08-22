import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export function FabCreate() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-20 z-30 flex justify-end pr-5">
      <Button
        size="icon"
        className="pointer-events-auto rounded-full shadow-sm"
        aria-label="Add item"
      >
        <Plus className="h-5 w-5" />
      </Button>
    </div>
  );
}
