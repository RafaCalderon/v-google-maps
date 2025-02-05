import pluginVue from "eslint-plugin-vue";
import eslingConfigPrettier from "@vue/eslint-config-prettier";
import eslintConfigTypescript from "@vue/eslint-config-typescript";

export default [
  {
    ignores: ["src/typings/**/*.d.ts"],
  },
  ...pluginVue.configs["flat/recommended"],
  ...eslintConfigTypescript(),
  eslingConfigPrettier,
  {
    files: ["src/**/*.ts", "src/**/*.vue"],
  },
];
