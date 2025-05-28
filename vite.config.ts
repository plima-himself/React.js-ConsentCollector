import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    // For absolute imports to work, both Typescript and vite have to be configured.
    // this plugin passes the typescript config to vite so that it can understand
    // absolute imports.
    tsconfigPaths(),
    react({
      // In local development mode, add component names to classnames generated
      // by styled-components
      ...(command === "serve" && {
        babel: {
          plugins: [
            [
              "babel-plugin-styled-components",
              {
                displayName: true,
                fileName: false,
              },
            ],
          ],
        },
      }),
    }),
  ],
}));
