# Documento de Contexto — Notia (Frontend)

## Visão Geral do Frontend

O **Notia** é uma aplicação web responsiva para salvar, organizar e compartilhar links de estudo. A camada de frontend é responsável por oferecer uma **experiência rápida, intuitiva e acessível** para estudantes, professores e autodidatas.

O objetivo principal do frontend é garantir **usabilidade, performance e consistência visual**, priorizando a navegação fluida e integração otimizada com a API backend.

---

## Tecnologias e Stack Principal

- **Framework:** React 19 + Vite
- **Estilização:** Tailwind CSS v4 + shadcn/ui (design system)
- **Roteamento:** TanStack Router
- **Gerenciamento de Estado e Dados:** TanStack Query
- **Animações:** motion.dev
- **Build e Deploy:** Vercel/Netlify
- **Forms e validação**: React Hook Form + Zod v4

---

## Funcionalidades Principais

### 1. Autenticação e Sessões

- Login via e-mail/senha e OAuth Google.
- Persistência segura de sessão com JWT em cookies httpOnly.
- Feedback visual claro para erros e estados de carregamento.

### 2. Gerenciamento de Pastas

- CRUD de pastas para organizar links.
- Indicadores visuais para status (pública, privada, compartilhada).
- Slug único para compartilhamento público.

### 3. CRUD de Links

- Inclusão e edição com validação automática de URLs.
- Visualização otimizada com preview do link (título, descrição, favicon).
- Integração com API para persistência em tempo real.

### 4. Sugestão Automática de Tags

- Integração com a API da OpenAI para recomendar tags.
- Confirmação manual pelo usuário antes de salvar.
- Design centrado na confiança: transparência sobre como as sugestões são geradas.

### 5. Compartilhamento de Pastas

- Visualização pública com slug único e seguro.
- Botão de cópia de link simplificado.
- Revogação instantânea do acesso público.

---

## Diretrizes de Design

- **UI Consistente:** shadcn/ui define o padrão visual da aplicação.
- **Responsividade:** Mobile-first, adaptável para tablets e desktops.
- **Acessibilidade (A11y):** ARIA roles, contraste adequado e navegação por teclado.
- **Experiência Otimizada:**
  - Carregamento otimista para operações CRUD.
  - Skeletons e placeholders para melhorar a percepção de velocidade.
- **Documento detalhado:** consulte "diretrizes-de-design.md" neste diretório para tokens, cores e padrões de uso.
- **Organização de componentes:** consulte "arquitetura-de-componentes.md" neste diretório.
- **Como criar componentes:** consulte "guia-de-componentes.md" neste diretório.

---

## Integrações e Comunicação com o Backend

- Consumo de API REST construída em **Fastify**.
- Padronização via **TanStack Query** para cache e sincronização de dados.
- Tratamento centralizado de erros com interceptores.

---

## Métricas e Qualidade de Frontend

| Métrica                                     | Meta   | Ferramenta           |
| ------------------------------------------- | ------ | -------------------- |
| **Tempo de LCP** (Largest Contentful Paint) | ≤1.5s  | Lighthouse           |
| **Interatividade** (TTI)                    | ≤2s    | Web Vitals           |
| **Tamanho do bundle inicial**               | ≤150KB | Vite Bundle Analyzer |
| **Cobertura de testes E2E**                 | ≥80%   | Playwright           |
| **NPS (Frontend)**                          | ≥50    | Hotjar / Surveys     |

---

## Roadmap de Evolução do Frontend

| Fase        | Entrega                                                    |
| ----------- | ---------------------------------------------------------- |
| **MVP**     | CRUD básico, autenticação, sugestão de tags                |
| **Pós-MVP** | Estatísticas de uso, modo dark/light, PWA                  |
| **Futuro**  | Busca semântica, extensões para navegador, suporte offline |

---

## Fluxo Arquitetural do Frontend

```
[Browser]
    ↓
[React + Vite SPA]
    ↓
[TanStack Router]
    ↓
[TanStack Query] ←→ [Fastify API]
    ↓
[Renderização UI com shadcn/ui + Tailwind]
```

---

## Boas Práticas Implementadas

- Atomic Design para componentes.
- Testes E2E com Playwright + Testing Library.
- Lazy loading e code splitting para melhorar performance.
- ESLint + Prettier para padronização de código.
- Monitoramento de erros com Sentry.
