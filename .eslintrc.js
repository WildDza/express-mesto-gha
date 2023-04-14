module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "airbnb-base",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
    quotes: ["error", "double"],
    "no-console": "off",
    "comma-dangle": [2, "only-multiline"],
    "object-curly-newline": "always",
  },
};
