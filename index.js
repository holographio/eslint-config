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
    }
  },
  rules: {
    indent: [
      'error',
      2,
      {
        "ignoredNodes": [
          "CallExpression > *"
        ]
      }
    ],
    'no-unexpected-multiline': 'off'
  }
}
