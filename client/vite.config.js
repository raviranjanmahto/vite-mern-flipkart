import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Ensure this matches what is expected in vercel.json
  },
  server: {
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:7007",
        changeOrigin: true,
      },
    },
  },
});
