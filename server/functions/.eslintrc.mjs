export default {
  env: {
    es2021: true,        // Supports modern JavaScript features
    node: true,          // Enables Node.js global variables
  },
  parserOptions: {
    ecmaVersion: 'latest', // Use the latest ECMAScript version
    sourceType: 'module',  // Enables ES Modules (import/export)
  },
  extends: [
    'eslint:recommended',
    'google',
  ],
  rules: {
    'no-restricted-globals': ['error', 'name', 'length'],
    'prefer-arrow-callback': 'error',
    'quotes': ['error', 'double', { allowTemplateLiterals: true }],
    'comma-dangle': ['error', 'always-multiline'],
    'indent': ['error', 2],
    'no-console': 'warn',
  },
  overrides: [
    {
      files: ['**/*.spec.*', '**/__tests__/*.js'],
      env: {
        mocha: true,
      },
      rules: {
        'no-unused-expressions': 'off',
      },
    },
  ],
  globals: {},
};
