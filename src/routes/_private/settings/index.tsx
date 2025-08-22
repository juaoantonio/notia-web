import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { User2, Mail, Moon, Globe, Shield, Database, Trash2 } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch.tsx";
import { meQueryOptions } from "@/modules/auth/auth.queries";

import { LogoutButton } from "./-components/logout-button";
import { SettingsItem } from "./-components/settings-item";
import { SettingsSection } from "./-components/settings-section";

export const Route = createFileRoute("/_private/settings/")({
  component: SettingsPage,
  staticData: { breadcrumb: "Settings", navigable: true },
});

function SettingsPage() {
  const { data: me } = useQuery(meQueryOptions);
  const qc = useQueryClient();

  return (
    <div className="space-y-6">
      {/* Perfil */}
      <Card>
        <CardContent className="flex items-center gap-4 p-4">
          {me?.picture ? (
            <img
              src={me.picture}
              alt={me?.name ?? "User"}
              className="h-12 w-12 rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="bg-muted text-muted-foreground grid h-12 w-12 place-items-center rounded-full">
              <User2 className="h-5 w-5" />
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{me?.name ?? "Usuário"}</p>
            <p className="text-muted-foreground flex items-center gap-1 truncate text-xs">
              <Mail className="h-3.5 w-3.5" />
              {me?.email ?? "—"}
            </p>
          </div>
          <div className="ml-auto">
            <LogoutButton />
          </div>
        </CardContent>
      </Card>

      {/* Aparência & Preferências */}
      <SettingsSection title="Aparência" description="Tema e comportamento da interface.">
        <SettingsItem
          left={<Moon className="h-4 w-4" />}
          title="Tema"
          subtitle="Claro / Escuro / Sistema"
          right={<ThemeToggle />}
        />
      </SettingsSection>

      <SettingsSection title="Preferências" description="Opções gerais da aplicação.">
        <SettingsItem
          left={<Globe className="h-4 w-4" />}
          title="Abrir links em nova aba"
          subtitle="Links externos serão abertos em nova guia do navegador"
          right={<span className="text-muted-foreground text-xs">Em breve</span>}
        />
        <Separator />
        <SettingsItem
          left={<Shield className="h-4 w-4" />}
          title="Pastas privadas por padrão"
          subtitle="Itens criados começam privados (recomendado)"
          right={<Switch />}
        />
      </SettingsSection>

      {/* Dados */}
      <SettingsSection title="Dados" description="Exportar, cache e sincronização.">
        <SettingsItem
          left={<Database className="h-4 w-4" />}
          title="Limpar cache local"
          subtitle="Apaga dados em memória e força recarregamento das informações"
          right={
            <Button
              variant="secondary"
              size="sm"
              onClick={() => qc.clear()}
              aria-label="Limpar cache local"
            >
              Limpar
            </Button>
          }
        />
        <Separator />
        <SettingsItem
          left={<Trash2 className="h-4 w-4" />}
          title="Excluir conta"
          subtitle="Remove sua conta e todos os dados definitivamente"
          right={<span className="text-muted-foreground text-xs">Solicitar</span>}
        />
      </SettingsSection>

      <p className="text-muted-foreground text-center text-xs">
        Versão do app — {import.meta.env?.VITE_APP_VERSION ?? "dev"}
      </p>
    </div>
  );
}
