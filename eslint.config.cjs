const eslintRecommended = require('@eslint/js').configs.recommended;
const tseslint = require('typescript-eslint');
const prettier = require('eslint-config-prettier');

module.exports = [
  // 👇 Objeto separado apenas com 'ignores'
  {
    ignores: ['node_modules/**/*', 'dist/**/*', '*.cjs'],
  },
  eslintRecommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
];
