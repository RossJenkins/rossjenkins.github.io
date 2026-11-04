import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './' keeps asset paths relative, so the same build works on
// username.github.io and username.github.io/repo-name.
export default defineConfig({ base: './', plugins: [react(), tailwindcss()] })
