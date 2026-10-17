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
  tailwind.configs['flat/recommended'] ?? tailwind.configs.recommended,
  ...nextCoreWebVitals,
  ...nextTypescript,
  prettier,
  {
    settings: {
      tailwindcss: { cssConfigPath: './src/styles/globals.css' },
    },
    rules: {
      // prettier-plugin-tailwindcss owns class order
      'tailwindcss/classnames-order': 'off',
      // Auto-fixable class rewrites; enable when cleaning up classes in PER-7
      'tailwindcss/no-unnecessary-arbitrary-value': 'off',
      'tailwindcss/enforces-canonical-classname': 'off',
    },
  },
]);
