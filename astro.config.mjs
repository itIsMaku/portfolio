import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://volkman.cz',
  output: 'static',
  adapter: node({ mode: 'standalone' }),

  image: {
    domains: ['github.com', 'avatars.githubusercontent.com'],
  },

  vite: {
    define: {
      __BUILD_VERSION__: JSON.stringify(process.env.BUILD_VERSION || '1.0.0'),
      __BUILD_COMMIT__: JSON.stringify(process.env.BUILD_COMMIT || 'dev'),
    },

    plugins: [tailwindcss()],
  },

  integrations: [sitemap()],
});