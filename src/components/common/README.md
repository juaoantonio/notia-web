# src/components/common

Componentes compartilhados entre múltiplas páginas/rotas. Devem ser compostos a partir dos primitivos do design system em `src/components/ui`.

Regras:

- Não dependem de estado de features/domínios; recebem dados por props.
- Não fazem import de `src/routes/-components`.
- Estilo com utilitários semânticos (bg-background, text-muted-foreground, ring-primary) mapeados em `src/styles.css`.
- Tipagem com TypeScript; prefira props mínimas e `children` quando adequado.
- Se um componente de `src/routes/-components` passar a ter 2+ usos, promova-o para cá e atualize os imports.

Exemplos de bons candidatos:

- Badges especializados (ex.: SessionBadge)
- Dialogs/Modais genéricos
- Toolbars reutilizáveis
- Empty states padrões
