import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export function FabCreate() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-20 z-30 flex justify-end pr-5">
      <Button
        className="pointer-events-auto h-15 w-15 rounded-full shadow-sm"
        aria-label="Add item"
      >
        <Plus className="min-h-6 min-w-6" />
      </Button>
    </div>
  );
}
