import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Use relative base so the site works when deployed to a subpath (GitHub Pages)
  base: './',
  plugins: [react()],
  server: { port: 5173 }
})
