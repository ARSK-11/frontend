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
      "park-superintendent-enhanced-produces.trycloudflare.com",
      "portable-stating-indicates-con.trycloudflare.com" // tambahkan domain ngrok atau cloudflare tunnel kamu di sini tanpa https://
    ]
  }
})