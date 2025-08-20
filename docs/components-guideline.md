# Guia de Criação de Componentes — Notia (Frontend)

Data: 2025-08-20  
Versão: 1.0

Este guia explica como criar componentes, onde colocá-los no projeto e quais padrões seguir para manter consistência visual e arquitetural.

Consulte também:

- Arquitetura de componentes: docs/arquitetura-de-componentes.md
- Diretrizes de design (tokens/cores/estados): docs/diretrizes-de-design.md

---

## Onde criar meu componente?

Siga estas regras práticas:

1. Primitivos do Design System (base: botão, input, card)

- Local: src/components/ui
- Padrões: API alinhada ao shadcn/ui; usar tokens semânticos (bg-primary, text-foreground...).

2. Componente reutilizável entre múltiplas páginas (ex.: Dialog genérico, Badge especializado)

- Local: src/components/common
- Padrões: não depende de estado específico de domínio; recebe dados por props; estilo semântico.

3. Seção de uma página específica (ex.: HeroSection da landing, PricingSection)

- Local: src/routes/-components
- Padrões: coeso àquela rota; se passar a ser reutilizado, promova para common.

4. Componente de domínio (quando features existirem)

- Local: src/features/<dominio>/components
- Padrões: próximo de hooks/serviços do domínio; exporte public API pelo index.ts da feature.

---

## Convenções de código

- Nome do arquivo: kebab-case (hero-section.tsx, pricing-card.tsx)
- Nome do componente: PascalCase (HeroSection, PricingCard)
- Estilo: utilitários semânticos definidos em src/styles.css (bg-background, text-muted-foreground, ring-primary)
- Acessibilidade: roles/aria-\* quando necessário; foco visível (ring-primary)
- Props: tipagem com TypeScript; preferir props mínimas; utilizar children quando fizer sentido
- Testes: componentes com lógica (condicionais, callbacks) devem ter testes (Vitest/RTL) quando aplicável

---

## Passo a passo: criando um componente comum

Exemplo: um Badge de seção reutilizável.

Arquivo: src/components/common/section-badge.tsx

```tsx
import { type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";

export function SectionBadge({ children }: { children: ReactNode }) {
  return <Badge className="bg-muted text-muted-foreground rounded-full">{children}</Badge>;
}
```

Uso:

```tsx
import { SectionBadge } from "@/components/common/section-badge";

<SectionBadge>Novidades</SectionBadge>;
```

Boas práticas aplicadas:

- Composto sobre um primitivo (Badge)
- Utiliza tokens semânticos (bg-muted, text-muted-foreground)
- API simples via children

---

## Passo a passo: criando uma seção de rota

Arquivo: src/routes/-components/hero-section.tsx (já existe um exemplo no projeto)

Pontos chave:

- Importar primitivos de ui: Button, Card etc.
- Usar classes semânticas; evitar cores fixas
- Manter o componente coeso à rota; isolar strings/textos e props quando preciso

---

## Promoção de componentes

- Se um componente em src/routes/-components for usado em 2+ lugares, mova-o para src/components/common.
- Atualize os imports (ex.: de "@/routes/-components/hero-section" para "@/components/common/hero-section").
- Revise nomes/props para refletir o caráter genérico após a promoção.

---

## Checklist rápido antes de abrir PR

- Colocação correta (ui, common, -components, features)
- Classes semânticas corretas (sem cores hardcoded)
- Foco visível e A11y adequados
- Props tipadas, API mínima e clara
- Dark mode verificado (contraste OK)

---

## Dúvidas frequentes

- Posso criar subpastas em common?
  - Sim, quando há um conjunto coeso (ex.: common/dialogs/\*).
- Posso adicionar variantes visuais?
  - Sim. Prefira variantes por classes semânticas e, quando necessário, props (variant="primary" | "ghost" ...), mapeadas a utilitários consistentes com os tokens.
