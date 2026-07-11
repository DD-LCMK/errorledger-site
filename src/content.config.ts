import { defineCollection, z } from 'astro:content';
import { glob } from 'astro:content/loaders';

const blog = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/blog" }),
	schema: z.object({
		// Accept both standard Astro keys and the AI's custom pipeline keys
		title: z.string().optional(),
		meta_title: z.string().optional(),
		description: z.string().optional(),
		meta_description: z.string().optional(),
		pubDate: z.coerce.date().optional(),
		pipeline_contract_version: z.string().optional(),
		slug: z.string().optional(),
		validated_environments: z.array(z.string()).optional(),
	}).transform((data) => ({
		// Map the AI data cleanly so the website layout doesn't crash
		title: data.meta_title || data.title || "Untitled Post",
		description: data.meta_description || data.description || "",
		pubDate: data.pubDate || new Date(), // Auto-assigns the build date if missing
	})),
});

export const collections = { blog };