import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useLogoutMutation } from "@/modules/auth/auth.queries";

export function LogoutButton() {
  const { mutate, isPending } = useLogoutMutation();
  return (
    <Button
      variant="destructive"
      onClick={() => mutate()}
      disabled={isPending}
      className="gap-2"
      aria-label="Sair da conta"
    >
      <LogOut className="h-4 w-4" />
    </Button>
  );
}
