module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'node': true,
  },
  'extends': ['eslint:recommended'],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'rules': {
    'indent': ['error', 2,
      {
        'SwitchCase': 1,
        'ignoredNodes': [
          'TemplateLiteral',
        ],
      }],
    'template-curly-spacing': [
      'off',
    ],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-single'],
    'comma-dangle': ['error', 'always-multiline'],
    'no-var': 'error',
    'prefer-destructuring': ['error', { 'array': true, 'object': true }, { 'enforceForRenamedProperties': false }],
    'prefer-template': 'error',
    'no-useless-rename': 'error',
    'no-trailing-spaces': 'error',
    'semi': ['error', 'always'],
    'eqeqeq': ['error', 'always'],
    'no-else-return': 'error',
    'no-extra-bind': 'error',
    'no-useless-return': 'error',
    'no-lonely-if': 'error',
    'new-parens': 'error',
    'no-multiple-empty-lines': 'error',
    'no-unneeded-ternary': 'error',
    'no-whitespace-before-property': 'error',
    'arrow-spacing': 'error',
    'space-before-blocks': ['error', 'always'],
    'no-unused-expressions': 0,
  },
};
