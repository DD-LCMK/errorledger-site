import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context) {
	const blog = await getCollection('blog');
	const insights = await getCollection('insights');
	
	// Merge streams and order chronologically by ErrorLedger publication date
	const allPosts = [...blog, ...insights].sort(
		(a, b) => new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf()
	);

	const siteUrl = context.site || 'https://errorledger.com';

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: siteUrl,
		// Adds media namespace for image thumbnails in Feedly/Inoreader
		xmlns: {
			media: 'http://search.yahoo.com/mrss/',
		},
		items: allPosts.map((post) => {
			const heroImage = post.data.heroImage
				? new URL(post.data.heroImage, siteUrl).href
				: `${siteUrl}/images/default-social-card.png`;

			return {
				title: post.data.title,
				description: post.data.description,
				pubDate: new Date(post.data.pubDate),
				// Clean URL output without trailing slashes matching canonical site routing
				link: `/${post.collection}/${post.data.shortenedSlug || post.slug}`,
				// Expose tags as RSS categories for topic-based aggregator pickup
				categories: post.data.tags || [],
				// Adds image thumbnail for RSS readers that support media:content
				customData: `<media:content
					url="${heroImage}"
					medium="image"
					type="image/png"
					width="1200"
					height="630"
				/>`,
			};
		}),
	});
}