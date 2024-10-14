import path from "path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["**/*.spec.tsx"],
    globals: true,
    setupFiles: ["./vitest-setup.ts"],
    css: true,
    coverage: {
      provider: "v8",
      include: ["src/**"],
      exclude: [
        "src/config/**",
        "src/testUtils/**",
        "src/main.tsx",
        "src/vite-env.d.ts",
        "src/models/**",
        "*.spec.tsx",
      ],
    },
  },
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [TanStackRouterVite(), react(), visualizer()],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler", // or "modern"
      },
    },
  },
});
