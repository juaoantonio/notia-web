import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { api } from "@/lib/api";
import { queryClient } from "@/main";

const folderSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  description: z.string().optional(),
  isPublic: z.boolean(),
});

type FolderInput = z.infer<typeof folderSchema>;

export const Route = createFileRoute("/_private/folders/new")({
  component: NewFolderPage,
  staticData: { breadcrumb: "Nova Pasta", navigable: true },
});

function NewFolderPage() {
  const navigate = useNavigate();
  const form = useForm<FolderInput>({
    resolver: zodResolver(folderSchema),
    defaultValues: { isPublic: false },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: FolderInput) => {
      const res = await api.post("/folders", data);
      return res.data;
    },
    onSuccess: async () => {
      toast.success("Pasta criada com sucesso!");
      await queryClient.invalidateQueries({ queryKey: ["folders"] });
      navigate({ to: "/home" });
    },
    onError: () => toast.error("Erro ao criar pasta."),
  });

  const onSubmit = (values: FolderInput) => mutateAsync(values);

  return (
    <main className="flex min-h-dvh items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Criar Nova Pasta</CardTitle>
          <CardDescription>Organize seus links em uma nova pasta.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Nome */}
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                {...form.register("name")}
                placeholder="Ex.: React, Estudos de IA..."
              />
              {form.formState.errors.name && (
                <p className="text-destructive text-sm">{form.formState.errors.name.message}</p>
              )}
            </div>

            {/* Descrição */}
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                {...form.register("description")}
                placeholder="Breve descrição (opcional)"
              />
            </div>

            {/* Pública */}
            <div className="flex items-center justify-between">
              <Label htmlFor="isPublic">Pasta pública?</Label>
              <Switch
                id="isPublic"
                checked={form.watch("isPublic")}
                onCheckedChange={(v) => form.setValue("isPublic", v)}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Criando..." : "Criar Pasta"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
