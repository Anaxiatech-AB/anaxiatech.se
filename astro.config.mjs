import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  base: '/',
  trailingSlash: 'never',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'sv'],
    routing: 'manual',
  },
});
