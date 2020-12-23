module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ["plugin:react/recommended", "google", "prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: "module",
    ecmaVersion: 2018,
  },
  plugins: ["react"],
  rules: {
    "require-jsdoc": 0,
  },
  overrides: [
    {
      files: ["src/*.jsx", "src/*.js"],
    },
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
}
