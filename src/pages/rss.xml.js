import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context) {
	const games = await getCollection('games');
	const siteUrl = context.site || 'https://aetherarcade.com';

	return rss({
		title: `${SITE_TITLE} - New Games & Puzzles`,
		description: SITE_DESCRIPTION,
		site: siteUrl,
		items: games.map((game) => ({
			title: `${game.data.icon} ${game.data.title} - ${game.data.tagline}`,
			description: game.data.description,
			link: `/games/${game.id}`,
			pubDate: new Date()
		}))
	});
}