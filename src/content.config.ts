import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/blog" }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		subtitle: z.string().optional(),
		meta_title: z.string().optional(),
		description: z.string(),
		pubDate: z.coerce.date().optional(),
		updatedDate: z.coerce.date().optional(),
		incidentDate: z.string().optional(),
		heroImage: z.string().optional(),
		ogImage: z.string().optional(),
		category: z.enum(['work', 'money', 'relationships', 'internet', 'ai', 'human', 'corporate']).default('corporate'),
		archetype: z.enum([
			'the-confession',
			'the-incident',
			'the-verdict',
			'the-investigation',
			'the-failure-anatomy'
		]).default('the-incident'),
		provenance_tier: z.number().min(1).max(4).default(1),
		provenance_label: z.string().optional(),
		provenance_source: z.string().optional(),
		read_time_minutes: z.number().default(5),
		archivist_summary: z.string().optional(),
		verdict_question: z.string().optional(),
		verdict_options: z.array(z.object({
			id: z.string(),
			label: z.string()
		})).optional(),
		tags: z.array(z.string()).default([]),
		slug: z.string().optional(),
		shortenedSlug: z.string().optional(),
		technicalTerms: z.record(z.string(), z.string()).optional(),
		pipeline_contract_version: z.string().optional(),
	}).transform((data) => {
		let slug = data.slug;
		if (!slug) {
			slug = data.title
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, '-')
				.replace(/(^-|-$)/g, '');
		}
		return {
			...data,
			shortenedSlug: slug,
			slug: slug,
			tags: data.tags && data.tags.length > 0 ? data.tags : ["Failure Archive"]
		};
	}),
});

export const collections = { blog };