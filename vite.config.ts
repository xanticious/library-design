import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/library-design/",
  server: {
    port: parseInt("3452", 10) || 5173,
  },
});
