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
      "brighton-shorts-afraid-mom.trycloudflare.com",
      "currently-italia-addresses-antique.trycloudflare.com",
      "received-analytical-portland-infrared.trycloudflare.com",
      "176.100.37.129:3001"
      // tambahkan domain ngrok atau cloudflare tunnel kamu di sini tanpa https://
    ]
  }
})