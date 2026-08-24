import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ 
		pattern: '**/*.{md,mdx}', 
		base: "./src/content/blog",
		generateId: ({ entry }) => entry.replace(/\\/g, '/').replace(/\.mdx?$/, '')
	}),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		subtitle: z.string().optional(),
		meta_title: z.string().optional(),
		description: z.string(),
		lang: z.enum(['en', 'ko']).default('en'),
		translationSlug: z.string().optional(),
		pubDate: z.coerce.date().optional(),
		updatedDate: z.coerce.date().optional(),
		incidentDate: z.string().optional(),
		incidentPeriod: z.string().optional(),
		incidentEndDate: z.string().optional(),
		systemTypes: z.array(z.string()).optional(),
		victimCount: z.number().optional(),
		victimCountQualifier: z.string().optional(),
		fatalities: z.string().optional(),
		injuries: z.string().optional(),
		regulatoryAction: z.string().optional(),
		correctiveAction: z.string().optional(),
		systemImpact: z.string().optional(),
		heroImage: z.string().optional(),
		ogImage: z.string().optional(),
		category: z.enum(['work', 'money', 'relationships', 'internet', 'ai', 'human', 'corporate', 'military', 'embedded-systems']).default('corporate'),
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
		executive_summary: z.string().optional(),
		summary_points: z.object({
			context: z.string(),
			trigger: z.string().optional(),
			systemic_failure: z.string().optional(),
			technical_mechanisms: z.string().optional(),
			fallout: z.string()
		}).optional(),
		verdict_question: z.string().optional(),
		verdict_source: z.string().optional(),
		verdict_options: z.array(z.object({
			id: z.string(),
			label: z.string(),
			votes: z.number().optional()
		})).optional(),
		tags: z.array(z.string()).default([]),
		primary_sources: z.array(z.object({
			title: z.string(),
			url: z.string(),
			type: z.string().optional(),
			institution: z.string().optional()
		})).optional(),
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
			translationSlug: data.translationSlug || slug,
			tags: data.tags && data.tags.length > 0 ? data.tags : ["Failure Archive"]
		};
	}),
});

export const collections = { blog };