import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const jsxA11yEntry = nextVitals.find((entry) => entry.plugins?.["jsx-a11y"]);

if (!jsxA11yEntry) {
  throw new Error("eslint-config-next no longer registers jsx-a11y");
}

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  {
    files: jsxA11yEntry.files,
    rules: jsxA11yEntry.plugins["jsx-a11y"].flatConfigs.recommended.rules,
  },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
  {
    files: ["**/*.cjs"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
