module.exports = {
  env: {
    "browser": true,
    "es6": true
  },
  extends: [
    'eslint:recommended',
    'airbnb-typescript', 
    'plugin:import/recommended'
  ],
  globals: {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: [
    '@typescript-eslint',
    'import'
  ],
  rules: {
    // Add your custom rules here
    '@typescript-eslint/comma-dangle' : 'off',
    '@typescript-eslint/indent': 'off',
    'indent': 'off',
    'react/jsx-filename-extension': [0],
  }
};
  