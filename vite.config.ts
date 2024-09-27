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
    coverage: {
      provider: "v8",
      include: ["src/**"],
      exclude: [
        "src/config/**",
        "src/testUtils/**",
        "src/main.tsx",
        "src/vite-env.d.ts",
        "src/models/**"
      ],
    },
  },
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [react()],
});
