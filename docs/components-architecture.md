# Arquitetura de Componentes — Notia (Frontend)

Data: 2025-08-20  
Versão: 1.0

Objetivo: documentar como os componentes estão organizados no projeto, onde criar novos componentes e quais convenções adotar para manter consistência e escalabilidade.

---

## Visão Geral da Organização

A aplicação segue uma organização pragmática, guiada por escopo e reuso:

- src/components/ui
  - Primitivos do design system (shadcn/ui).  
  - Ex.: button.tsx, input.tsx, card.tsx, accordion.tsx.
  - Customizações via utilitários semânticos (bg-primary, text-foreground...).

- src/components/common
  - Componentes compartilhados entre múltiplas páginas/rotas, compostos a partir dos primitivos de ui.  
  - Exemplos: badges especializados, avatares compostos, toolbars genéricas, modais reutilizáveis.

- src/routes/-components
  - Componentes de seção específicos de páginas/rotas (escopo local), como trechos da landing page (Hero, Pricing, FAQ).  
  - O prefixo "-components" é usado para não colidir com o roteamento e para deixar explícito que são componentes e não rotas.  
  - Podem importar utilitários/DS, mas evitam dependências cíclicas com common.

- src/components/* (outros)
  - Itens de topo de aplicação (ex.: nav-header.tsx, theme-toggle.tsx) que não se encaixam em common ou ui por estarem muito ligados ao shell da app.

- Futuro (quando surgirem domínios de produto): src/features/<dominio>/components  
  - Componentes específicos de um domínio (ex.: folders, links), próximos de hooks e serviços desse domínio.  
  - Devem exportar apenas o necessário para uso externo (barreira clara entre domínio e app).

---

## Regras de Colocação

1) Quero criar um botão, input, dropdown base  
- Local: src/components/ui  
- Regra: manter API alinhada ao padrão shadcn/ui, com tokens semânticos.

2) Quero criar um componente reutilizável entre várias rotas (ex.: SessionBadge, Modal genérico)  
- Local: src/components/common  
- Regra: sem dependências de estado global de features; receber dados por props.

3) Quero criar uma seção visual de uma página específica (ex.: HeroSection da landing)  
- Local: src/routes/-components  
- Regra: componente coeso para aquela rota; se ficar genérico, promova para common.

4) Quero criar um componente específico de um domínio (ex.: Card de Pasta)  
- Local: src/features/folders/components (quando o folder existir)  
- Regra: próximo do domínio; exportar public API pelo index.ts do pacote do domínio.

---

## Convenções

- Nomes de arquivos: kebab-case (hero-section.tsx, pricing-card.tsx).  
- Nomes de componentes React: PascalCase (HeroSection, PricingCard).  
- Estilização: sempre via classes semânticas mapeadas em src/styles.css (bg-background, text-muted-foreground, ring-primary).  
- Acessibilidade: atribuir roles/aria-* quando necessário; foco visível (ring-primary).  
- Temas: verificar contraste em light/dark.  
- Props: tipar com TypeScript, manter props mínimas; preferir children quando fizer sentido.  
- Pastas: promover componentes de -components para common quando surgirem 2+ usos.

---

## Exemplos do Projeto

- Route-scoped: src/routes/-components/pricing-section.tsx — usa Card e Button (ui), aplica ring-primary para destaque.  
- Route-scoped: src/routes/-components/hero-section.tsx — chips/badges com bg-primary/10 e text-primary.  
- Common: src/components/common/session-badge.tsx — badge reutilizável para seções.  
- UI: src/components/ui/input.tsx — já aplica selection:bg-primary selection:text-primary-foreground.

---

## Evolução e Reorganização

- Comece em -components para seções de páginas; quando houver reuso, mova para common e ajuste imports.  
- Ao criar features, centralize componentes do domínio em src/features/<dominio>/components.  
- Evite dependências cíclicas: ui não deve importar de common; common pode importar apenas de ui e utilitários de baixo nível.

---

## Relação com Diretrizes de Design

Siga "docs/diretrizes-de-design.md" para tokens, cores, raios e tipografia.  
Este documento foca na organização e localização; o outro garante consistência visual.
