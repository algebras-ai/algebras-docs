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
  redirects: {
    '/api/': '/api/translation/translate/',
    '/api/translation/': '/api/translation/translate/',
    '/api/batch-translation/': '/api/translation/translate-batch/',
    '/api/agentic-translation/': '/api/translation/agentic-translation/',
    '/api/localization-table/': '/api/translation/localization-table/',
    '/cli/': '/cli/installation/',
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
          label: 'Algebras Platform',
          items: [{ autogenerate: { directory: 'app' } }],
        },
        {
          label: 'Algebras API',
          items: [
            { label: 'Languages', slug: 'api/languages' },
            {
              label: 'Translation',
              items: [{ autogenerate: { directory: 'api/translation' } }],
            },
            {
              label: 'Glossaries',
              items: [{ autogenerate: { directory: 'api/glossaries' } }],
            },
            {
              label: 'Metrics',
              items: [{ autogenerate: { directory: 'api/metrics' } }],
            },
          ],
        },
        {
          label: 'Algebras CLI',
          items: [{ autogenerate: { directory: 'cli' } }],
        },
      ],
    }),
    react(),
  ],
});
