import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  outDir: './docs',
  base: '/algebras-docs',
  build: {
    assets: 'app_assets',
  },
  integrations: [
    starlight({
      title: 'Algebras',
      sidebar: [
        {
          label: 'General',
          items: [{ label: 'Introduction', slug: 'general/introduction' }],
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
      ],
    }),
    react(),
  ],
});
