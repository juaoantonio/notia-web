import { Search } from "lucide-react";

import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";

export function SearchBar() {
  return (
    <div className="bg-background/70 rounded-xl border p-2 backdrop-blur">
      <div className="flex items-center gap-2">
        <Input id="vault-search" placeholder="Buscar" className="h-11 flex-1" />
        <Button variant="secondary" className="h-11 px-4">
          <Search />
        </Button>
      </div>
    </div>
  );
}
