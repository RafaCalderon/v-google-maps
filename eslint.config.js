import pluginVue from "eslint-plugin-vue";
import eslingConfigPrettier from "@vue/eslint-config-prettier";
import eslintConfigTypescript from "@vue/eslint-config-typescript";

export default [
  ...pluginVue.configs["flat/recommended"],
  ...eslintConfigTypescript(),
  eslingConfigPrettier,
  {
    files: ["**/*.ts", "**/*.vue"],
  },
];
