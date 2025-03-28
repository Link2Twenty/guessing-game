import eslintConfigPrettier from 'eslint-config-prettier';
import prettier from 'eslint-plugin-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import tsParser from '@typescript-eslint/parser'

export default [
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    plugins: { 'react-hooks': reactHooks, prettier, },
    languageOptions: { parser: tsParser, },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'prettier/prettier': 'warn',
    },
  },
  eslintConfigPrettier,
]