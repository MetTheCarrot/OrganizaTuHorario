import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA(
      {
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
        manifest: {
          name: 'OrganizaTuHorario',
          short_name: 'OrganizaTuHorario',
          description: 'Organiza tu horario de clases de forma sencilla y rápida',
          id: 'com.santihsilva.organizatuhorario',
          display: 'fullscreen',
          theme_color: '#000000',
          icons: [
            {
              src: '/icons/android-launchericon-48-48.png',
              sizes: '48x48',
              type: 'image/png',
            },
            {
              src: '/icons/android-launchericon-72-72.png',
              sizes: '72x72',
              type: 'image/png',
            },
            {
              src: '/icons/android-launchericon-96-96.png',
              sizes: '96x96',
              type: 'image/png',
            },
            {
              src: '/icons/android-launchericon-144-144.png',
              sizes: '144x144',
              type: 'image/png',
            },
            {
              src: '/icons/android-launchericon-192-192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/icons/android-launchericon-512-512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
      }
    )
  ],
  base: "https://santihsilva.github.io/OrganizaTuHorario/",
})
