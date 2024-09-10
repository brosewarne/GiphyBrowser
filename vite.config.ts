import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["**/*.spec.tsx"],
    globals: true,
    setupFiles: ["./vitest-setup.ts"],
    css: true,
  },
});
