import path from "path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["**/*.spec.tsx"],
    globals: true,
    setupFiles: ["./vitest-setup.ts"],
    css: true,
  },
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [react()],
});
