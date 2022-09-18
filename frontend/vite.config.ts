import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "^/autocomplete": {
        target: "http://127.0.0.1:9001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/autocomplete/, ""),
      },
      "^/get_route": {
        target: "http://127.0.0.1:9002",
        changeOrigin: true,
        rewrite: (path) => {
          console.log(path);
          return path.replace(/get_route/, "");
        },
      },
    },
  },
});
