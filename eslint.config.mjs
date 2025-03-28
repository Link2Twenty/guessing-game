import eslintConfigPrettier from 'eslint-config-prettier';
import prettier from 'eslint-plugin-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'

export default [
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    plugins: { 'react-hooks': reactHooks, '@typescript-eslint': tsPlugin, prettier },
    languageOptions: { parser: tsParser, },
    rules: {
      'prettier/prettier': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      ...tsPlugin.configs.recommended.rules,
    },
  },
  eslintConfigPrettier
]