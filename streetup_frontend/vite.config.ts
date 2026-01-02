import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,                     // permite acceso desde LAN
    port: 5173,
    strictPort: true,
    cors: {
      origin: "http://192.168.1.227:8000",   // tu Django
      credentials: true,
    },
    hmr: {
      host: "192.168.1.227",        // tu IP LAN
      protocol: "ws",
    },
  },
});
