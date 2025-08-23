import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/interactive-pathfinder",
  plugins: [react(), tailwindcss()],
  preview: {
    port: process.env.SERVE_PORT ? parseInt(process.env.SERVE_PORT) : 4173,
    strictPort: true,
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },
});
