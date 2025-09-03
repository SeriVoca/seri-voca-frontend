// @ts-nocheck

// defineConfig 는 TypeScript 전용이므로 제거합니다.
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import configPrettier from 'eslint-config-prettier';

// defineConfig() 로 감싸지 않고 배열을 바로 export 합니다.
export default [
  // 무시할 경로 설정
  {
    ignores: ['dist', 'build', 'coverage', 'node_modules'],
  },

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // JS 권장 설정
  js.configs.recommended,

  // TS 권장 설정
  ...tseslint.configs.recommended,

  // React, React Hooks, JSX-A11y 규칙
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: {
      // 사용하는 플러그인을 명시적으로 등록합니다.
      ...pluginReactConfig.plugins,
      'react-hooks': pluginReactHooks,
      'jsx-a11y': pluginJsxA11y,
    },
    languageOptions: {
      ...pluginReactConfig.languageOptions,
    },
    // 버전을 특정하지 말고 detect 옵션으로 자동 추적
    settings: { react: { version: 'detect' } },
    rules: {
      ...pluginReactConfig.rules,
      ...pluginReactHooks.configs.recommended.rules,
      ...pluginJsxA11y.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // Vite + React 17+ 환경에서는 React 를 import 할 필요 없음
      'react/jsx-uses-react': 'off',
      'react/prop-types': 'off', // TypeScript 를 사용하므로 prop-types 는 필요 없음
    },
  },

  // Prettier 규칙
  configPrettier,
];
