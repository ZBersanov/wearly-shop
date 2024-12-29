import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ManifestOptions, VitePWA } from "vite-plugin-pwa";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

const manifest: Partial<ManifestOptions> | false = {
  theme_color: "#2b1c3f",
  background_color: "#0d0c0c",
  icons: [
    {
      purpose: "maskable",
      sizes: "512x512",
      src: "icon512_maskable.png",
      type: "image/png",
    },
    {
      purpose: "any",
      sizes: "512x512",
      src: "icon512_rounded.png",
      type: "image/png",
    },
  ],
  screenshots: [
    {
      src: "/screenshots/desktop.png",
      type: "image/png",
      sizes: "1918x858",
      form_factor: "wide",
    },
    {
      src: "/screenshots/mobile.png",
      type: "image/png",
      sizes: "395x690",
      form_factor: "narrow",
    },
  ],
  orientation: "any",
  display: "standalone",
  dir: "ltr",
  lang: "ru-RU",
  name: "pwa-app",
  short_name: "papp",
  start_url: "/",
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{html,css,js,ico,png,svg,jpg}"],
      },
      manifest: manifest,
    }),
    tsconfigPaths(),
    svgr(),
  ],
});
