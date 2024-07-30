import ts from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";

export default ts.config(...ts.configs.recommended, ...pluginVue.configs["flat/recommended"], {
  files: ["*.vue", "**/*.vue"],
  languageOptions: {
    parserOptions: {
      parser: "@typescript-eslint/parser",
    },
  },
});
