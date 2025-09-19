import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",                // Put compiled files here (Chrome loads from here)
    emptyOutDir: true,             // Clean old builds
    rollupOptions: {
      input: { content: "src/content.tsx" },   // Your content script entry
      output: {
        entryFileNames: "content.js",          // Name the built file exactly
        assetFileNames: "assets/[name][extname]"
      }
    },
    target: "chrome120"         // Emit JS targeting modern Chrome
    
    // sourcemap: true,             // (optional) nicer debugging
  }
  ,resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
