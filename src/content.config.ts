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
		slug: z.string().optional(),
	}).transform((data) => {
		const baseString = data.slug || data.meta_title || data.title || "post";
		
		const cleanSlug = baseString
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/(^-|-$)/g, '');

		const shortSlug = cleanSlug.split('-').slice(0, 5).join('-');
		
		return {
			title: data.meta_title || data.title || "Untitled Post",
			description: data.meta_description || data.description || "",
			pubDate: data.pubDate || new Date(),
			shortenedSlug: shortSlug,
		};
	}),
});

export const collections = { blog };