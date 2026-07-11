import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/blog" }),
	schema: z.object({
		title: z.string().optional(),
		meta_title: z.string().optional(),
		description: z.string().optional(),
		meta_description: z.string().optional(),
		pubDate: z.coerce.date().optional(),
	}).transform((data, entry) => {
		// Slice the long filename down to the first 5 core terms for the URL
		const shortSlug = entry.id.split('-').slice(0, 5).join('-');
		
		return {
			title: data.meta_title || data.title || "Untitled Post",
			description: data.meta_description || data.description || "",
			pubDate: data.pubDate || new Date(),
			shortenedSlug: shortSlug,
		};
	}),
});

export const collections = { blog };