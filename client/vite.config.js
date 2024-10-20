import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
  plugins: [react()],
<<<<<<< HEAD
})

server: {
  hmr: {
    overlay: false
  }
}
=======
});
>>>>>>> 4640afb49750012256204462b4eabf3cd16a9f6b
