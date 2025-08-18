import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import reactHooks from "eslint-plugin-react-hooks";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // 1) Global ignores for build artifacts (Flat Config global ignores)
  {
    ignores: [
      "**/node_modules/**",
      ".next/**",
      "out/**",
      "dist/**",
      "coverage/**",
      "**/*.min.js",
    ],
  },

  // 2) Next.js recommended + TypeScript + Prettier conflict disable
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "prettier" // eslint-config-prettier
  ),

  // 3) React Hooks rules
  {
    plugins: { "react-hooks": reactHooks },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];

export default eslintConfig;