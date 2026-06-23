// @ts-check

import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
	site: 'https://s3ak6i-dev-github-io.vercel.app',
	integrations: [sitemap()],
});
