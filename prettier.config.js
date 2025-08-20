export default {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  bracketSpacing: true,
  bracketSameLine: false,
  jsxSingleQuote: false,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindFunctions: ["clsx", "cn", "cva"], // mantém ordenação em helpers comuns
};
