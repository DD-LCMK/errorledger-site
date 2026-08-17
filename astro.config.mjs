// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://errorledger.com',
	// Enforces non-trailing slashes across all generated routes, redirects, and sitemaps
	trailingSlash: 'never',
	build: {
		format: 'directory',
	},
	// RESOLVES P0 ISSUE: Redirects legacy crawlers to the correct Astro sitemap index
	redirects: {
		'/sitemap.xml': '/sitemap-index.xml'
	},
	integrations: [
		mdx(), 
		sitemap({
			// Remove ignored priority and changefreq, and avoid build-time lastmod per Google guidelines
		})
	],
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Atkinson',
			cssVariable: '--font-atkinson',
			fallbacks: ['sans-serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/atkinson-regular.woff'],
						weight: 400,
						style: 'normal',
						display: 'swap',
					},
					{
						src: ['./src/assets/fonts/atkinson-bold.woff'],
						weight: 700,
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
	],
});