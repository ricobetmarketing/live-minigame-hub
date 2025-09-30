import { defineConfig } from 'vite'

// CI passes BASE_PATH="/<repo-name>/" so GitHub Pages paths work.
// Locally, BASE_PATH is undefined, so it falls back to '/'.
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  server: { port: 5173 },
  build: { outDir: 'dist' }
})
