import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Reglas para código de Node.js
  {
    files: ["/*.js"],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 2021,
    },
    plugins: { js },
    extends: ["js/recommended"]
  },

  // Reglas específicas para JS en el navegador (como /public/*.js)
  {
    files: ["public//*.js"],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 2021,
    }
  },

  // Reglas específicas para pruebas con Jest
  {
    files: ["tests//*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest
      },
      ecmaVersion: 2021,
    }
  }
]);