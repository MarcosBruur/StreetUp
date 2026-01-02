import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    host: true,
    port: 5173,
    strictPort: true,
    cors: {
      origin: [
        "http://localhost:8000",
        "http://127.0.0.1:8000",
        "http://192.168.1.227:8000",
      ],
      credentials: true,
    },
    hmr: {
      host: "localhost",
      protocol: "ws",
    },
  },

  build: {
    outDir: "../streetup_backend/server/static", // ajusta tu ruta real
    emptyOutDir: true,
  },
});
