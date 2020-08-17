module.exports = {
  extends: 'eslint:recommended',
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module'
  },
  rules: {
    indent: [
      'error',
      2,
      {
        'ignoredNodes': [
          'CallExpression > *'
        ]
      }
    ],
    'no-unexpected-multiline': 'off'
  }
}
