import { defineConfig } from "vite"
import react from "@vitejs/plugin-react";
import linaria from "@linaria/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    linaria(),
  ],
});
