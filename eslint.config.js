import js from "@eslint/js";
import tanstackQuery from "@tanstack/eslint-plugin-query";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import unusedImports from "eslint-plugin-unused-imports";
import vitest from "eslint-plugin-vitest";
import ts from "typescript-eslint";

export default ts.config(
  // Ignorar saídas e dependências
  {
    ignores: [
      "dist",
      "coverage",
      "node_modules",
      "playwright-report",
      ".pnpm-store",
      ".vercel",
      ".netlify",
    ],
  },

  // Base JS + TS
  js.configs.recommended,
  ...ts.configs.recommended, // não-type-aware (rápido para Vite)

  // Projetos que quiserem regras type-aware (opcional):
  // ...ts.configs.recommendedTypeChecked,
  // { languageOptions: { parserOptions: { project: ["./tsconfig.json"], tsconfigRootDir: import.meta.dirname } } },

  // Regras globais para browser/ES2023
  {
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
      },
    },
  },

  // React + A11y + Hooks + Tailwind + Import Order + Query
  {
    plugins: {
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      import: importPlugin,
      "unused-imports": unusedImports,
      "react-refresh": reactRefresh,
      "@tanstack/query": tanstackQuery,
      vitest,
    },
    settings: {
      react: { version: "detect" },
      // Permite resolver aliases do Vite (se usar @ -> src)
      "import/resolver": {
        node: { extensions: [".js", ".jsx", ".ts", ".tsx"] },
        typescript: true,
      },
    },
    rules: {
      // --- Qualidade & padrões ---
      "no-debugger": "warn",

      // Remove imports não usados de forma automática
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      // Ordenação consistente de imports
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
            "object",
            "type",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
          pathGroups: [
            { pattern: "react", group: "external", position: "before" },
            { pattern: "@/**", group: "internal", position: "after" },
          ],
          pathGroupsExcludedImportTypes: ["react"],
        },
      ],

      // React 19 / JSX Runtime
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/self-closing-comp": "warn",

      // Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // A11y
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-is-valid": "warn",
      "jsx-a11y/no-autofocus": "warn",

      // Vite HMR
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],

      // TanStack Query boas práticas
      "@tanstack/query/exhaustive-deps": "warn",
      "@tanstack/query/no-rest-destructuring": "warn",

      // Tailwind (usa tokens semânticos; classnames em string)
      "tailwindcss/no-custom-classname": "off",
      "tailwindcss/classnames-order": "off", // delegamos ao prettier-plugin-tailwindcss
    },
  },

  // Arquivos React/TSX
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
  },

  // Testes unitários (Vitest + RTL)
  {
    files: ["**/*.{test,spec}.{ts,tsx}"],
    languageOptions: {
      globals: vitest.environments.env.globals, // habilita describe,it,vi,expect...
    },
    plugins: { vitest },
    rules: {
      "no-console": "off",
    },
  },

  // Playwright E2E (se usar em e2e/**)
  {
    files: ["e2e/**/*.{ts,tsx}"],
    languageOptions: {
      globals: {
        page: "readonly",
        browser: "readonly",
        context: "readonly",
      },
    },
  },

  // Integração com Prettier (desativa conflitos de formatação)
  // Instale também: pnpm i -D eslint-config-prettier
  {
    ignores: [],
    rules: {
      "arrow-body-style": "off",
      "prefer-arrow-callback": "off",
    },
  },
);
