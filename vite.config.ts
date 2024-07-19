import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      includeAssets: ["favicon.svg", "robots.txt"],
      manifest: {
        name: "SPEEDCUBING TIMER",
        short_name: "TIMER",
        description: "SPEEDCUBING TIMER",
        theme_color: "#FFFFFF",
      },
    }),
  ],
});
