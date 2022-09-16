module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: { jsx: true }, // allows for the parsing of JSX
  },
  plugins: ['prettier', 'react-hooks', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@next/next/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off', // nextjs handles that
    'react/display-name': 'off',
    'react-hooks/rules-of-hooks': 'error', // e.g.: no conditional hooks
    'react-hooks/exhaustive-deps': 'warn', // e.g.: hook dependency checks
    'react/prop-types': 'off', // using TS instead
    'no-empty-function': 'off',
    'no-undef': 'error',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended', // eslint TypeScript rules (github.com/typescript-eslint/typescript-eslint)
        'plugin:@typescript-eslint/recommended',
        'prettier',
      ],
      rules: {
        '@next/next/no-img-element': 'off',
        '@typescript-eslint/no-empty-function': 'off',
      },
    },
  ],
};
