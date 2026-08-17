import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/blog" }),
	schema: z.object({
		// Contract Version
		pipeline_contract_version: z.string().optional(),

		// Editorial Archetypes (v2.0)
		archetype: z.enum([
			'the-confession',
			'the-incident',
			'the-verdict',
			'the-investigation',
			'the-failure-anatomy',
			'incident-forensics',
			'systems-analysis',
			'lifestyle-systems'
		]).optional(),

		// Core Content & SEO
		title: z.string().optional(),
		subtitle: z.string().optional(),
		meta_title: z.string().optional(),
		description: z.string().optional(),
		pubDate: z.coerce.date().optional(),
		incidentDate: z.coerce.date().optional(),
		updatedDate: z.coerce.date().optional(),

		// Categories & Provenance (v2.0)
		category: z.enum([
			'work',
			'money',
			'relationships',
			'internet',
			'ai',
			'human',
			'corporate'
		]).optional(),
		provenance_tier: z.number().min(1).max(4).optional(),
		provenance_label: z.string().optional(),
		provenance_source: z.string().optional(),

		// The Archivist & Interactive Verdict (v2.0)
		archivist_summary: z.string().optional(),
		verdict_question: z.string().optional(),
		verdict_options: z.array(z.object({
			id: z.string(),
			label: z.string(),
		})).optional(),

		// Taxonomy & Slug
		tags: z.array(z.string()).optional(),
		keyword: z.string().optional(),
		shortenedSlug: z.string().optional(),
		slug: z.string().optional(),
		read_time_minutes: z.number().optional(),
		difficulty_level: z.string().optional(),

		// Visuals
		heroImage: z.string().optional(),
		ogImage: z.string().optional(),
	}).transform((data) => {
		const rawTitle = data.title || data.meta_title || "Untitled Failure Entry";
		const rawMetaTitle = data.meta_title || data.title || "ErrorLedger: Every Mistake Leaves a Story";
		const cleanMetaTitle = rawMetaTitle.length > 60 ? rawMetaTitle.slice(0, 57) + "..." : rawMetaTitle;

		const rawDescription = data.description || "Real failures. Strange decisions. Unbelievable consequences. Investigating the moments when systems and humans collapse.";
		const cleanDescription = rawDescription.length < 100
			? rawDescription.padEnd(100, ' ')
			: rawDescription.length > 160
				? rawDescription.slice(0, 157) + "..."
				: rawDescription;

		const finalPubDate = data.pubDate || new Date();
		const finalIncidentDate = data.incidentDate || data.pubDate || new Date();

		const baseSlug = data.slug || data.shortenedSlug || rawTitle;
		const cleanSlug = baseSlug
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/(^-|-$)/g, '');

		return {
			...data,
			title: rawTitle,
			subtitle: data.subtitle || "",
			meta_title: cleanMetaTitle,
			description: cleanDescription,
			pubDate: finalPubDate,
			incidentDate: finalIncidentDate,
			slug: cleanSlug,
			shortenedSlug: cleanSlug,
			category: data.category || 'corporate',
			archetype: data.archetype || 'the-incident',
			provenance_tier: data.provenance_tier || 1,
			provenance_label: data.provenance_label || 'Documented Incident',
			tags: data.tags && data.tags.length > 0 ? data.tags : ['human-failure', 'decisions', 'investigation'],
		};
	}),
});

const insights = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/insights" }),
	schema: z.object({
		title: z.string(),
		meta_title: z.string().optional(),
		description: z.string(),
		pubDate: z.coerce.date(),
		tags: z.array(z.string()).optional(),
		slug: z.string().optional(),
	}).transform((data) => {
		const baseSlug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
		return {
			...data,
			shortenedSlug: baseSlug,
			tags: data.tags && data.tags.length > 0 ? data.tags : ["Insights"]
		};
	}),
});

export const collections = { blog, insights };