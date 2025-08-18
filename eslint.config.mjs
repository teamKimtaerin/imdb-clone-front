import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import reactHooks from "eslint-plugin-react-hooks";
import storybook from "eslint-plugin-storybook";
import reactHooks from "eslint-plugin-react-hooks";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  // 1) Global ignores for build artifacts (Flat Config global ignores) - 가장 먼저 선언
  {
    ignores: [
      "**/node_modules/**",
      ".next/**",
      "out/**",
      "dist/**",
      "coverage/**",
      "**/*.min.js",
      "storybook-static/**",  // Storybook 빌드 폴더 추가
      ".storybook/**/*.js",   // Storybook 설정 파일 (필요시)
    ],
  },

  // 2) Next.js + TypeScript 기본 설정
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript"
  ),

  // 3) Storybook 설정 (stories 파일에만 적용)
  {
    files: ["**/*.stories.@(ts|tsx|js|jsx|mjs|cjs)"],
    extends: [
      "plugin:storybook/recommended"
    ],
    rules: {
      // Storybook 특정 규칙
      "storybook/hierarchy-separator": "warn",
      "storybook/default-exports": "error",
    }
  },

  // 4) React Hooks 규칙
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: { 
      "react-hooks": reactHooks 
    },
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

  // 5) TypeScript 파일 특정 규칙
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { 
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_" 
      }],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },

  // 6) Prettier 충돌 방지 (가장 마지막에)
  ...compat.extends("prettier"),
];

export default eslintConfig;