import { defineConfig } from "cypress";

const port = process.env.SERVE_PORT || 5173;

export default defineConfig({
  viewportHeight: 900,
  viewportWidth: 1440,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: `http://localhost:${port}/interactive-pathfinder`,
  },
});
