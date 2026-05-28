import { defineConfig, globalIgnores } from "eslint/config";
import react from "eslint-plugin-react";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores([
    "**/webpack.*.js",
    "**/*.png",
    "**/*.bmp",
    "**/*.jpg",
    "**/*.svg",
  ]),
  {
    extends: compat.extends(
      "eslint:all",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/all",
      "prettier",
    ),

    plugins: {
      react,
      "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: "module",

      parserOptions: {
        project: "./tsconfig.json",
      },
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      "max-statements": "off",
      "one-var": "off",
      "func-style": ["error", "declaration"],
      "prefer-template": "off",
      "sort-keys": "off",
      "no-magic-numbers": "off",
      "no-ternary": "off",
      "no-underscore-dangle": "off",
      "line-comment-position": "off",
      "no-unused-vars": "off",

      quotes: [
        "error",
        "double",
        {
          avoidEscape: true,
        },
      ],

      "id-length": "off",
      "no-inline-comments": "off",
      "no-undefined": "off",
      "capitalized-comments": "off",
      "no-shadow": "off",
      "init-declarations": "off",
      "max-lines": "off",

      "max-lines-per-function": [
        "error",
        {
          max: 100,
        },
      ],

      "dot-notation": "off",

      "react/jsx-filename-extension": [
        "error",
        {
          extensions: [".jsx", ".tsx"],
        },
      ],

      "react/jsx-no-literals": "off",
      "react/require-default-props": "off",

      "react/jsx-max-depth": [
        "error",
        {
          max: 6,
        },
      ],

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-shadow": "error",
    },
  },
  {
    files: ["lambda/**/*"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: "module",
    },
    rules: {
      "no-console": "off",
      "require-await": "off",
      "line-comment-position": "off",
    },
  },
  {
    files: ["scripts/download-data/**/*"],
    rules: {
      "no-console": "off",
    },
  },
]);
