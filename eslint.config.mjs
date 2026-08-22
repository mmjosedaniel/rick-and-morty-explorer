import tseslint from "typescript-eslint";

export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/dist-server/**",
      "**/build/**",
      "**/out/**",
      "**/.next/**",
      "**/.vite/**",
      "**/*.tsbuildinfo",
      "**/coverage/**",
      "**/.nyc_output/**",
      "**/.artifacts/**",
      "**/.cache/**",
      "**/.eslintcache",
      "**/tmp/**",
      "**/temp/**",
    ],
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: {
          allowDefaultProject: [
            "*.config.ts",
            "scripts/*.ts",
            "tests/smoke/*.ts",
            "tests/smoke/fixtures/*.ts",
          ],
          defaultProject: "tsconfig.tools.json",
          maximumDefaultProjectFileMatchCount_THIS_WILL_SLOW_DOWN_LINTING: 11,
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      "no-var": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
    },
  },
];
