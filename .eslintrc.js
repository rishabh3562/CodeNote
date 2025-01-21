module.exports = {
  parserOptions: {
    ecmaVersion: 'latest', // Use the latest ECMAScript version
    sourceType: 'module'   // Allows `import`/`export` syntax
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended"
  ],
  rules: {
    "prettier/prettier": ["error"]
  }
};


// module.exports = {
//   env: {
//     browser: true,
//     es2021: true,
//     node: true,
//   },
//   extends: [
//     'eslint:recommended',
//     'plugin:react/recommended',
//     'plugin:prettier/recommended',
//     'plugin:@typescript-eslint/recommended',
//   ],
//   parser: '@typescript-eslint/parser',
//   parserOptions: {
//     ecmaVersion: 'latest',
//     sourceType: 'module',
//     ecmaFeatures: {
//       jsx: true,
//     },
//   },
//   plugins: ['react', '@typescript-eslint', 'prettier'],
//   rules: {
//     'prettier/prettier': 'error',
//     'react/react-in-jsx-scope': 'off',
//     'react/prop-types': 'off',
//     '@typescript-eslint/explicit-module-boundary-types': 'off',
//     '@typescript-eslint/no-explicit-any': 'warn',
//     'no-console': 'warn',
//     'no-unused-vars': 'warn',
//   },
// };
