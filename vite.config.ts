import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // For absolute imports to work, both Typescript and vite have to be configured.
    // this plugin passes the typescript config to vite so that it can understand
    // absolute imports.
    tsconfigPaths(),
  ],
});
