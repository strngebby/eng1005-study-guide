// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { satteri } from '@astrojs/markdown-satteri';
import cardsPlugin from './src/lib/cards-plugin.mjs';

/**
 * One entry per week. To add a week, create `src/content/docs/week-N/`
 * and add a line here. Pages inside the folder are ordered by the
 * `sidebar.order` value in their frontmatter.
 */
const weeks = [
	{ n: 1, topic: 'Vectors, lines and planes' },
	{ n: 2, topic: 'Systems of linear equations' },
	{ n: 3, topic: 'Matrices' },
];

// GitHub Pages address: https://strngebby.github.io/eng1005-study-guide/
const SITE = 'https://strngebby.github.io';
const BASE = '/eng1005-study-guide';

export default defineConfig({
	site: SITE,
	base: BASE,
	// A week's folder address (e.g. /week-1/) opens that week's first page.
	redirects: Object.fromEntries(weeks.map((w) => [`/week-${w.n}`, `${BASE}/week-${w.n}/introduction/`])),
	markdown: { processor: satteri({ hastPlugins: [cardsPlugin()], features: { smartPunctuation: false } }) },
	integrations: [
		starlight({
			title: 'ENG1005 Study Guide',
			description: 'Unofficial student notes for ENG1005.',
			credits: false,
			pagination: true,
			customCss: ['./src/styles/theme.css', './src/styles/print.css'],
			head: [
				{ tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
				{ tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true } },
				{
					tag: 'link',
					attrs: {
						rel: 'stylesheet',
						href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap',
					},
				},
			],
			components: {
				Footer: './src/components/overrides/Footer.astro',
			},
			sidebar: weeks.map((w) => ({
				label: `Week ${w.n}: ${w.topic}`,
				items: [{ autogenerate: { directory: `week-${w.n}` } }],
			})),
		}),
	],
});
