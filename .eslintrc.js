module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'semi': ['error', 'never'],
    'comma-dangle': ['error', 'never'],
    'import/extensions': ['error', 'never'],
    'space-before-function-paren': ['error', 'always'],
    'import/no-cycle': 'off'
  },

  parserOptions: {
    parser: 'babel-eslint',
  },

  'extends': [
    'plugin:vue/essential',
    '@vue/airbnb'
  ]
};
