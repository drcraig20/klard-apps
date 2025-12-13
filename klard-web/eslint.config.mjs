import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // TypeScript-ESLint rules for immutability (plugin already provided by nextTs)
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Enforce read-only props for immutability in React components
      "@typescript-eslint/prefer-readonly-parameter-types": [
        "warn",
        {
          checkParameterProperties: true,
          ignoreInferredTypes: true, // Don't flag when type is inferred
          allow: [
            // Web API types
            "RequestInit",
            "AbortController",
            "FormData",
            // Date is commonly passed but rarely mutated
            "Date",
            // DOM Event types
            "Event",
            "MouseEvent",
            "KeyboardEvent",
            "ChangeEvent",
            "FocusEvent",
            "FormEvent",
            // React types
            "RefObject",
            "MutableRefObject",
            // Common mutable patterns
            "Error",
            "RegExp",
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
