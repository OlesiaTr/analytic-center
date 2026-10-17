import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import tailwind from 'eslint-plugin-tailwindcss';
import prettier from 'eslint-config-prettier/flat';

export default defineConfig([
  globalIgnores([
    '.next/',
    'out/',
    'build/',
    'coverage/',
    'public/',
    'screenshots/',
    'next-env.d.ts',
  ]),
  js.configs.recommended,
  ...tailwind.configs['flat/recommended'],
  ...nextCoreWebVitals,
  ...nextTypescript,
  prettier,
  {
    rules: {
      '@next/next/no-img-element': 'off',
    },
  },
]);
