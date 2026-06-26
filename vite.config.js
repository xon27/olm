import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Temporary: "/olm/" for GitHub Pages. Change back to "/" before Hostinger deploy.
export default defineConfig({
  
  base: "/olm/",
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "animation-vendor": ["framer-motion"],
        },
      },
    },
  },
});
