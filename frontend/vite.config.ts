import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/autocomplete":
        import.meta.env.API_PATH + "/autcomplete" || "http://127.0.0.1:9001",
      "/getRoute":
        import.meta.env.API_PATH + "/getRoute" || "http://127.0.0.1:9002",
    },
  },
});
