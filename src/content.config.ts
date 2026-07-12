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
		tags: z.array(z.string()).optional(), // Added support for explicit frontmatter tags
	}).transform((data) => {
		const baseString = data.slug || data.meta_title || data.title || "post";
		
		const cleanSlug = baseString
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/(^-|-$)/g, '');

		const shortSlug = cleanSlug.split('-').slice(0, 5).join('-');
		
		// Auto-infer metadata tags from the title to avoid editing raw .md files
		const inferredTags: string[] = data.tags || [];
		if (inferredTags.length === 0) {
			const lowerTitle = (data.title || "").toLowerCase();
			if (lowerTitle.includes("supabase")) inferredTags.push("Supabase", "Database");
			if (lowerTitle.includes("stripe")) inferredTags.push("Stripe", "Payments");
			if (lowerTitle.includes("clerk")) inferredTags.push("Clerk", "Auth");
			if (lowerTitle.includes("auth0")) inferredTags.push("Auth0", "Auth");
			if (lowerTitle.includes("firebase")) inferredTags.push("Firebase", "Backend");
			if (lowerTitle.includes("prisma")) inferredTags.push("Prisma", "ORM");
			if (lowerTitle.includes("mongodb") || lowerTitle.includes("mongoose")) inferredTags.push("MongoDB", "Database");
			if (lowerTitle.includes("redis")) inferredTags.push("Redis", "Cache");
			if (lowerTitle.includes("sentry")) inferredTags.push("Sentry", "DevOps");
			if (lowerTitle.includes("openai")) inferredTags.push("OpenAI", "AI");
			if (lowerTitle.includes("resend")) inferredTags.push("Resend", "Email");
			if (lowerTitle.includes("lambda")) inferredTags.push("AWS", "Serverless");
			if (lowerTitle.includes("worker")) inferredTags.push("Cloudflare", "Serverless");
			if (lowerTitle.includes("node")) inferredTags.push("Node.js");
			
			// Fallback if no keywords match
			if (inferredTags.length === 0) inferredTags.push("Backend");
		}
		
		return {
			title: data.meta_title || data.title || "Untitled Post",
			description: data.meta_description || data.description || "",
			pubDate: data.pubDate || new Date(),
			shortenedSlug: shortSlug,
			tags: inferredTags,
		};
	}),
});

export const collections = { blog };