import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  base: "./",
  plugins: [react()],
  resolve: { alias: { "@renovera/landing-ui": fileURLToPath(new URL("./src/shared/renovera-landing-ui.js", import.meta.url)) } },
  build: {
    assetsDir: "assets"
  }
});
