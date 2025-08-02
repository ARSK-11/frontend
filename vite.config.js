import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    allowedHosts: [
      "shut-penalty-decrease-croatia.trycloudflare.com",
      "behavior-front-avatar-mitsubishi.trycloudflare.com" // tambahkan domain ngrok atau cloudflare tunnel kamu di sini tanpa https://
    ]
  }
})