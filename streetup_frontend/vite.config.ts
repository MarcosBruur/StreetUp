import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs-extra"
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "clean-django-static",
      buildStart() {
        const target = path.resolve(__dirname, "../streetup_backend/server/static/assets");
        fs.emptyDirSync(target);
        console.log("🧹 Limpieza de static Django completada");
      },
    },
  ],

  server: {
    host: true,
    port: 5173,
    strictPort: true,
    cors: {
      origin: [
        "http://localhost:8000",
        "http://127.0.0.1:8000",
        "http://192.168.1.227:8000",
        "http://marcos.alexis.ar",
      ],
      credentials: true,
    },
    hmr: {
      host: "localhost",
      protocol: "ws",
    },
  },

  build: {
    outDir: "../streetup_backend/server/static",
    emptyOutDir: false, // NO hace nada fuera del root, por eso limpiamos manualmente
  },
});
