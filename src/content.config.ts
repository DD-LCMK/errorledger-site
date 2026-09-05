import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const games = defineCollection({
	loader: glob({ 
		pattern: '**/*.{md,mdx}', 
		base: "./src/content/games",
		generateId: ({ entry }) => entry.replace(/\\/g, '/').replace(/\.mdx?$/, '')
	}),
	schema: z.object({
		title: z.string(),
		tagline: z.string(),
		description: z.string(),
		category: z.enum(['stream', 'card', 'puzzle', 'arcade', 'word', 'strategy']).default('stream'),
		badge: z.string().default('Popular'),
		icon: z.string().default('🎡'),
		players: z.string().default('1 Player (vs AI)'),
		playTime: z.string().default('2-4 mins'),
		controls: z.array(z.string()).default([]),
		rules: z.array(z.string()).default([]),
		features: z.array(z.string()).default([]),
		faqItems: z.array(z.object({
			q: z.string(),
			a: z.string()
		})).optional(),
		featured: z.boolean().default(false),
		rating: z.number().default(4.9),
		plays: z.string().default('12.4K'),
	})
});

export const collections = { games };