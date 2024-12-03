import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  outDir: './docs',
  integrations: [
    starlight({
      title: 'Algebras',
      sidebar: [
        {
          label: 'Guides',
          items: [{ label: 'Example Guide', slug: 'guides/example' }],
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
