import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/clashplay/', // For GitHub Pages deployment
  build: {
    outDir: 'dist',
  },
  resolve: {
    dedupe: ["react", "react-dom"],
  },
})
