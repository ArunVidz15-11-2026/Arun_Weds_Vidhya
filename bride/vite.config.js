import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative asset paths — works whether the site is served from a domain root
  // (Vercel, Netlify) or a subpath (GitHub Pages, e.g. /repo-name/).
  base: './',
})
