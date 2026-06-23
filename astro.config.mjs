// @ts-check

import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
	site: 'https://surya-krishna.vercel.app', // update after first Vercel deploy
	integrations: [sitemap()],
});
