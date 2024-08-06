import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

// import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  // plugins: [react(), tsconfigPaths()],
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "./src/assets"),
    },
  },
  build: {
    outDir: "dist",
  },
});
