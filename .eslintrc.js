//    "eslint-config-google": "^0.14.0",
//     "eslint-config-prettier": "^8.8.0",
//     "eslint-config-standard-with-typescript": "^34.0.1",
//     "eslint-plugin-import": "^2.27.5",
//     "eslint-plugin-n": "^15.7.0",
//     "eslint-plugin-prettier": "^4.2.1",
//     "eslint-plugin-promise": "^6.1.1",

module.exports = {
  env: {
    browser: false,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {}
}
