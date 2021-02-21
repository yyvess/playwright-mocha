module.exports = {
  env: {
    commonjs: true,
    es6: true,
    mocha: true,
    node: true
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'func-names': 'off',
    'no-console': 'off',
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        trailingComma: 'none'
      }
    ]
  }
};
