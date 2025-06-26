import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    outDir: "dist",
    emptyOutDir: true,
    minify: false,
    rollupOptions: {
      input: {
        frontend: resolve(__dirname, "frontend/src/index.ts"),
        backend: resolve(__dirname, "backend/src/index.ts"),
      },
      output: {
        dir: "dist",
        entryFileNames: (chunkInfo) => {
          return `${chunkInfo.name}/index.js`;
        },
        format: "cjs",
      },
    },
  },
  test: {
    globals: true,
    environment: "node",
  },
  // Note: TypeScript types are emitted by tsc, not Vite. Ensure tsc is run for types.
});
