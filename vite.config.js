import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.jsx']
    })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://zyxcl.xyz/exam_api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  }
})
