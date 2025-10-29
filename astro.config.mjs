import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  outDir: './docs',
  // base: '/algebras-docs',
  site: 'https://docs.algebras.ai',
  build: {
    assets: 'app_assets',
  },
  integrations: [
    starlight({
      title: 'Algebras',
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        {
          label: 'General',
          items: [
            { label: 'Introduction', slug: 'general/introduction' },
            { label: 'Getting Started', slug: 'general/getting-started' }
          ],
        },
        {
          label: 'CLI',
          items: [
            { label: 'Installation', slug: 'cli/installation' },
            { label: 'Configuration', slug: 'cli/configuration' },
            { label: 'Commands', slug: 'cli/commands' },
            { label: 'Advanced Features', slug: 'cli/advanced' },
            { label: 'Troubleshooting', slug: 'cli/troubleshooting' }
          ],
        },
        {
          label: 'API',
          autogenerate: { directory: 'api' },
        },
      ],
    }),
    react(),
  ],
});
