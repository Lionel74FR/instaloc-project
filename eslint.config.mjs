import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;

module.exports = {
  rules: {
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript/no-unused-expressions': 'off',
    '@typescript/no-empty-object-type': 'off',
    '@typescript/no-this-alias': 'off'
  }
};