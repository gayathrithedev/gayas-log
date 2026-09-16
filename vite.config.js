import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync, renameSync } from 'node:fs'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), ...(mode === 'focus' ? [{
    name: 'focus-standalone',
    generateBundle() {
      for (const file of ['favicon.svg', 'focus/gift-closed.png', 'focus/gift-open.png']) {
        this.emitFile({ type: 'asset', fileName: file, source: readFileSync(new URL(`./public/${file}`, import.meta.url)) });
      }
    },
    writeBundle(options) {
      renameSync(resolve(options.dir, 'focus.html'), resolve(options.dir, 'index.html'));
    },
  }] : [])],
  build: {
    outDir: mode === 'focus' ? 'dist-focus' : 'dist',
    copyPublicDir: mode !== 'focus',
    rollupOptions: { input: mode === 'focus' ? { focus: 'focus.html' } : { home: 'index.html', networking: 'networking.html', books: 'books.html', focus: 'focus.html' } },
  },
}))
