import nextConfig from "eslint-config-next";
import prettierConfig from "eslint-config-prettier";
import jsxA11y from "eslint-plugin-jsx-a11y";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // ── Ignore build artefacts ─────────────────────────────────────────────────
  {
    ignores: [".next/**", "node_modules/**", "out/**", "public/**"],
  },

  // ── Next.js flat config ────────────────────────────────────────────────────
  // Registers react, react-hooks, jsx-a11y, import, and @next/next plugins,
  // and sets core-web-vitals rules including TypeScript parser for .ts/.tsx.
  ...nextConfig,

  // ── TypeScript ESLint strict ───────────────────────────────────────────────
  // Includes @typescript-eslint/no-explicit-any: error and other strict rules.
  // Applied after nextConfig so it owns the TS parser configuration.
  ...tseslint.configs.strict,

  // ── Workaround: pin React version to avoid eslint-plugin-react auto-detect ─
  // eslint-config-next bundles eslint-plugin-react 7.x which calls
  // context.getFilename() — an API removed in ESLint 10. Providing an explicit
  // version bypasses the detectReactVersion() code path that triggers this.
  {
    settings: {
      react: { version: "19.0.0" },
    },
  },

  // ── Project-level rules ────────────────────────────────────────────────────
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      // Hooks: promote exhaustive-deps from warn → error
      "react-hooks/exhaustive-deps": "error",

      // Accessibility: full recommended set (plugin already registered by nextConfig;
      // spreading rules only avoids the duplicate-plugin-instance error in ESLint 10)
      ...jsxA11y.flatConfigs.recommended.rules,
      // Next.js <Link> renders its own <a> — disable conflicting anchor rule
      "jsx-a11y/anchor-is-valid": "off",

      // TypeScript: allow underscore-prefixed unused identifiers
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      // Enforce import grouping and ordering
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },

  // ── Prettier ───────────────────────────────────────────────────────────────
  // Must be last: disables all formatting rules that Prettier owns.
  prettierConfig,
);
