module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["standard", "plugin:testcafe-community/recommended"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    semi: [1, "always"],
    quotes: ["error", "double"],
    "comma-dangle": ["warning", "always"],
  },
  plugins: ["testcafe-community"],
};
