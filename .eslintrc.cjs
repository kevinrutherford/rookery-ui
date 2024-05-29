module.exports = {
  env: {
    'node': true,
    'es6': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:@stylistic/disable-legacy',
  ],
  plugins: [
    '@typescript-eslint',
    '@stylistic',
    '@stylistic/ts',
    'react-hooks',
    'simple-import-sort',
    'unused-imports',
  ],
  rules: {
    '@stylistic/comma-dangle': ['error', 'always-multiline'],
    '@stylistic/indent': ['error', 2],
    '@stylistic/no-multiple-empty-lines': ['error', { 'max': 1, 'maxBOF': 0, 'maxEOF': 1 }],
    '@stylistic/ts/member-delimiter-style': ['error', {
      'multiline': {
        'delimiter': 'comma',
        'requireLast': true,
      },
      'singleline': {
        'delimiter': 'comma',
        'requireLast': false,
      },
      'multilineDetection': 'brackets',
    }],
    '@stylistic/ts/semi': ['error', 'never'],
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'always'],
    'import/prefer-default-export': 'off',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'object-curly-spacing': ['error', 'always'],
    'quotes': ['error', 'single'],
    'simple-import-sort/imports': ['error', {
      'groups': [['^\\u0000', '^node:', '^@?\\w', '^', '^\\.']],
    }],
    'simple-import-sort/exports': 'error',
    'unused-imports/no-unused-imports-ts': 'error',
  },
  settings: {
    'import/resolver': {
      typescript: true,
      node: true,
    },
    react: {
      version: 'detect',
    },
  },
}

