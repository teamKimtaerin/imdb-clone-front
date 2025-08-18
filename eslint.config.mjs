// eslint.config.mjs
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import reactHooks from 'eslint-plugin-react-hooks';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Convert legacy "extends" presets (next, prettier, plugin:storybook/*) to Flat Config
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  // 1) Global ignores (Flat Config 전역 ignores)
  {
    ignores: [
      '**/node_modules/**',
      '.next/**',
      'out/**',
      'dist/**',
      'coverage/**',
      '**/*.min.js',
      'storybook-static/**',
      // Storybook 설정 파일 제외
      '.storybook/**',
    ],
  },

  // 2) JS 기본 권장 규칙
  js.configs.recommended,

  // 3) Next.js + TypeScript + Prettier 충돌 해소
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // 4) Storybook 권장 규칙 (stories 파일에만 적용) - 단순화
  {
    files: ['**/*.stories.@(ts|tsx|js|jsx|mjs|cjs)'],
    rules: {
      // Storybook 특정 규칙들을 비활성화하여 충돌 방지
      'storybook/no-renderer-packages': 'off',
      'import/no-anonymous-default-export': 'off',
    },
  },

  // 5) React Hooks 규칙 (프로젝트 전역)
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: { 'react-hooks': reactHooks },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

  // 6) TypeScript 전용 규칙
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },

  // 7) Prettier와의 충돌 방지
  ...compat.extends('prettier'),
];

export default eslintConfig;
