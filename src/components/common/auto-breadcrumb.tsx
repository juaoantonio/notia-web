import { Fragment } from "react";

import { Link, useMatches } from "@tanstack/react-router";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type AutoBreadcrumbProps = {
  /** Máximo de itens inline (inclui root e o último). Default: 3 (root, …, último). */
  size?: number;
  /** Rótulo da raiz. */
  rootLabel?: string;
  className?: string;
};

const normalizeHref = (href: string) =>
  href.replace(/\/_layout(\/|$)/g, "/").replace(/\/{2,}/g, "/");

export function AutoBreadcrumb({ size = 3, rootLabel = "Home", className }: AutoBreadcrumbProps) {
  const matches = useMatches();

  // Só mostra rotas explicitamente navegáveis
  const items = matches
    .filter((m) => m.staticData?.navigable === true && m.pathname && m.pathname !== "/")
    .map((m) => {
      const label =
        typeof m.staticData?.breadcrumb === "function"
          ? m.staticData.breadcrumb(m.params)
          : (m.staticData?.breadcrumb ?? decodeURIComponent(m.pathname.split("/").pop() ?? ""));
      return { id: m.id, href: normalizeHref(m.pathname), label };
    });

  const total = items.length;
  const last = items[total - 1];
  const middle = total > 1 ? items.slice(0, -1) : [];

  // reserva root e último → sobra (size - 2) para o meio
  const maxInlineMiddle = Math.max(0, size - 2);
  const inlineMiddle = middle.slice(0, maxInlineMiddle);
  const hiddenMiddle = middle.slice(maxInlineMiddle);

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {/* Root */}
        <BreadcrumbItem>
          {total ? (
            <BreadcrumbLink asChild>
              <Link to="/">{rootLabel}</Link>
            </BreadcrumbLink>
          ) : (
            <BreadcrumbPage>{rootLabel}</BreadcrumbPage>
          )}
        </BreadcrumbItem>

        {/* Middle inline */}
        {inlineMiddle.map((m) => (
          <Fragment key={m.id}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={m.href}>{m.label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Fragment>
        ))}

        {/* Dropdown com middle escondidos */}
        {hiddenMiddle.length > 0 && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="flex items-center gap-1"
                  aria-label="Mostrar caminhos intermediários"
                >
                  <BreadcrumbEllipsis className="size-4" />
                  <span className="sr-only">Toggle menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {hiddenMiddle.map((m) => (
                    <DropdownMenuItem key={m.id} asChild>
                      <Link to={m.href}>{m.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </>
        )}

        {/* Último (página atual) */}
        {last && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{last.label}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
