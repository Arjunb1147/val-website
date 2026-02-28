// ============================================================
// VITE.CONFIG.JS — Configuration for Vite, our frontend build tool.
//
// Vite is like a "compiler + live preview server" for the frontend.
// It takes our React code (JSX), processes it, and serves it to the browser.
// It also provides instant hot-reloading — when you save a file,
// the browser updates automatically without a full page refresh.
// ============================================================

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Plugins extend Vite's capabilities.
  // The "react" plugin tells Vite how to understand and compile React/JSX code.
  plugins: [react()],

  server: {
    // The frontend will be accessible at http://localhost:3000
    port: 3000,

    // PROXY SETUP — This is important for connecting frontend to backend.
    // When the frontend code calls "/api/pillars", Vite intercepts it
    // and forwards (proxies) the request to our backend at http://localhost:5001.
    // This avoids CORS issues during development and keeps our code clean
    // (we just write "/api/..." instead of "http://localhost:5001/api/...").
    proxy: {
      "/api": "http://localhost:5001",
    },
  },
});
