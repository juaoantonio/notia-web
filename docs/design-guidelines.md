# Diretrizes de Design — Notia (Frontend)

Data: 2025-08-20  
Versão: 1.0

Objetivo: padronizar o uso de cores, superfícies, tipografia utilitária, raios, estados e componentes com base nos tokens CSS e no uso real no código. Todo o projeto utiliza Tailwind v4 + shadcn/ui com mapeamento de tokens em src/styles.css.


## 1) Princípios
- Use sempre classes semânticas (bg-background, text-foreground, text-muted-foreground, bg-card, ring-primary) em vez de cores fixas.
- Prefira os componentes do design system (shadcn/ui) e personalize via utilitários semânticos.
- Mantenha contraste adequado e comportamento consistente entre temas claro/escuro.
- Evite hardcodes de cores; centralize mudanças alterando tokens em src/styles.css.


## 2) Temas e dark mode
- O tema escuro é ativado via classe .dark no elemento <html> (ver src/styles.css).
- Tokens principais variam por tema:
  - Light: --primary usa a paleta azul (Tailwind blue-600); --ring azul-600.
  - Dark: --primary usa azul-500; --ring azul-500.
- Para transições suaves entre temas, use a classe utilitária theme-transition em um wrapper quando necessário.
- Respeito a acessibilidade: há regra para prefers-reduced-motion reduzindo transições.


## 3) Tokens de cor (semânticos)
Definidos em src/styles.css (blocos :root e .dark). Você acessa via utilitários Tailwind já mapeados:

Superfícies e texto
- bg-background / text-foreground: plano de fundo e cor base do texto.
- bg-card / text-card-foreground: para cartões e superfícies elevadas leves.
- bg-popover / text-popover-foreground: menus e popovers.

Primária e variações
- bg-primary / text-primary-foreground: botões de ação principal, badges primárias.
- text-primary, bg-primary/10, bg-primary/20: realces sutis (chips, destaques, glows).

Secundárias e estados neutros
- bg-secondary / text-secondary-foreground: superfícies secundárias.
- text-muted-foreground: textos auxiliares (descrições, legendas). Evite para textos críticos.
- bg-accent / text-accent-foreground: destaques contextuais.

Bordas, campos e foco
- border-border: bordas padrão.
- border-input: borda de campos.
- ring-primary: foco de destaque consistente. Combine com ring-1 ou ring-2.

Erros/Destrutivo
- bg-destructive para estados de erro. Em componentes shadcn/ui, prefira a variante destructive do próprio componente; para texto, use text-destructive quando disponível.

Gráficos (data viz)
- text-chart-1..5 e bg-chart-1..5: cores de séries em gráficos. Padronize a ordem das séries.

Sidebar
- bg-sidebar, text-sidebar-foreground, bg-sidebar-accent, bg-sidebar-primary etc. para layouts com navegação lateral.

Observação: os tokens são expostos via @theme inline e mapeados para as classes do Tailwind (ex.: --color-primary -> bg-primary, text-primary, ring-primary).


## 4) Raios e cantos
- Raio padrão: --radius (atual ~0.625rem). Em utilitários: rounded-lg é o padrão da UI.
- Variações relativas estão disponíveis: --radius-sm, --radius-md, --radius-lg, --radius-xl.
- Recomendações:
  - Controles pequenos (chips, inputs): rounded-md.
  - Cartões e folhas: rounded-lg.
  - Elementos especiais (hero badges): rounded-full quando apropriado.


## 5) Elevação, bordas e foco
- Prefira sombras leves: shadow-xs, shadow-sm para cartões e superfícies.
- Use border-border para linhas divisórias e contornos.
- Foco visível: ring-1 ring-primary (ou ring-2 conforme componente) + outline-ring/50 já aplicado no @layer base.


## 6) Tipografia utilitária
- Use as escalas do Tailwind (text-sm, text-base, text-xl...) e combine com as cores semânticas.
- Texto auxiliar: text-muted-foreground. Exemplo real: PricingSection e HeroSection.
- Nunca use cores hex diretamente em textos; sempre utilize as classes semânticas.


## 7) Componentes (shadcn/ui) e exemplos práticos
Botão (primário)
- Classe base do DS usa bg-primary text-primary-foreground e hover:bg-primary/90.
- Exemplo: <Button>Criar conta</Button>.

Card
- Use bg-card text-card-foreground por padrão (o DS já aplica). Para destaque sutil: ring-1 ring-primary.
- Exemplo real: PricingSection utiliza ring-1 ring-primary no plano “Premium”.

Badges e chips
- Use bg-primary text-primary-foreground para badges de ênfase; para sutis, bg-primary/10 text-primary.

Inputs
- Utilize placeholder:text-muted-foreground, file:text-foreground, selection:bg-primary selection:text-primary-foreground (já presente em Input).

Tabs, accordions e navegação
- Use bg-muted text-muted-foreground para estados inativos e data-[state=active]:bg-background para ativo (vide components/ui/tabs.tsx).
- Ícones auxiliares: text-muted-foreground dentro de accordions.

Links e navegações
- Estados hover devem migrar de text-muted-foreground para text-foreground (ver nav-header.tsx).


## 8) Dark mode: boas práticas
- Teste contraste em ambos os temas. Em dark, o primário é mais claro (blue-500) e anéis seguem a mesma cor.
- Evite bg-white/black diretos; sempre use bg-background, bg-card etc.
- Para brilhos/destaques visuais, prefira bg-primary/10 ou /20 sobre superfícies.


## 9) Acessibilidade
- Use componentes com estados de foco claros (ring-primary) e tamanho de toque adequado.
- Garanta contraste suficiente entre foreground e background, especialmente para text-muted-foreground.
- Respeite prefers-reduced-motion; evite animações excessivas em elementos críticos.


## 10) Animações e movimento
- motion.dev é a base para animações. Combine com a classe theme-transition para transições de tema.
- Skeletons e placeholders devem ser usados para carregamentos (já indicado em docs/context.md).


## 11) Do e Don’t
Do
- Utilizar bg-primary e text-primary-foreground para CTAs.
- Usar text-muted-foreground para descrições secundárias.
- Aplicar ring-1 ring-primary para realçar foco ou destaque de cartão.

Don’t
- Não usar códigos hex ou cores arbitrárias diretas nas classes.
- Não misturar tokens de estados (ex.: usar destructive para sucesso).
- Não remover focos visuais em elementos interativos.


## 12) Exemplos de uso existentes no código
- pricing-section.tsx: text-muted-foreground em descrições; selo “Mais popular” com bg-primary text-primary-foreground; destaque do card com ring-1 ring-primary.
- hero-section.tsx: glows e chips com bg-primary/10 e text-primary.
- components/ui/button.tsx e badge.tsx: bg-primary text-primary-foreground padrão.
- components/ui/input.tsx: selection:bg-primary selection:text-primary-foreground; placeholder:text-muted-foreground.


## 13) Como evoluir os tokens
- Alterações de identidade (ex.: trocar a cor primária) devem ser feitas em src/styles.css nos blocos :root e .dark.
- Novos contextos (ex.: “warning”, “success”) podem ser adicionados como tokens semânticos seguindo o mesmo padrão e mapeados no @theme inline.


## 14) Convenções de nomenclatura
- Prefira nomes semânticos (primary, secondary, accent, muted, destructive, ring, border, input, background, foreground).
- Para domínios específicos: chart-1..5, sidebar-*. Manter consistência na ordem e aplicação.


## 15) Checklist rápido
- Usa classes semânticas?  
- Contraste ok em light e dark?  
- Foco visível com ring-primary?  
- Raios consistentes com rounded-md/lg?  
- Nada de cores hardcoded?  

