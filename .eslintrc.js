module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 1,
  },
  overrides: [
    {
      files: ['packages/client/**/*.{ts,tsx}'],
      extends: [
        'plugin:react/recommended',
        'plugin:react-hooks/recommended'
      ],
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      plugins: [
        'react',
        'react-hooks'
      ],
      rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off'
      },
      settings: {
        react: {
          version: 'detect'
        }
      }
    }
  ]
}
