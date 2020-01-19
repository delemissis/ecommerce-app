module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "react/jsx-filename-extension": 0,
    "no-underscore-dangle": 0,
    "jsx-a11y/label-has-associated-control": 0,
    "react/prop-types": 0,
    "react/destructuring-assignment": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "react/jsx-props-no-spreading": 0,
    "no-nested-ternary": 0,
    "import/prefer-default-export": 0,
    "linebreak-style": 0
  },
};
