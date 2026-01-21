import js from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'

export default [
  js.configs.recommended,
  {
    ignores: ['node_modules', 'dist', 'build'],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        console: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        Buffer: 'readonly',
      },
    },
    rules: {
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'no-console': 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  prettierConfig,
]
