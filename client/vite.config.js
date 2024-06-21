import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      external: ["react", "react-dom"],
    },
  },
  server: {
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:7007",
    //     changeOrigin: true,
    //   },
    // },
  },
});
