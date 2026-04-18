import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";
import solidPlugin from "vite-plugin-solid";
import devtools from "solid-devtools/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    devtools(),
    solidPlugin(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "icon-190.png", "icon-512.png"],
      manifest: {
        name: "Odds Finder",
        short_name: "OddsFinder",
        description: "Find the best odds for your bets offline.",
        theme_color: "#0f172a",
        background_color: "#0f172a",
        icons: [
          {
            src: "icon-190.png",
            sizes: "190x190",
            type: "image/png",
          },
          {
            src: "icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  server: {
    port: 3000,
    allowedHosts: true,
  },
  preview: {
    allowedHosts: true,
  },
  build: {
    target: "esnext",
  },
  test: {
    environment: "jsdom",
    globals: true,
    server: {
      deps: {
        inline: [/solid-js/],
      },
    },
  },
});
