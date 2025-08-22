import { defineConfig } from "vite";
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
});
