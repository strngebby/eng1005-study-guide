/**
 * Markdown (Sätteri hast) plugin: wraps each `## Heading` and everything after
 * it, up to the next `##`, in <section class="card">. Authors write plain
 * Markdown/MDX and still get the card layout, and the headings stay in the
 * "On this page" table of contents.
 */
const isH2 = (n) =>
	n.type === 'element' &&
	(n.tagName === 'h2' ||
		(n.tagName === 'div' && String(n.properties?.class ?? n.properties?.className ?? '').includes('level-h2')));

export default function cardsPlugin() {
	return {
		after(root, ctx) {
			if (!root.children.some(isH2)) return;
			const out = [];
			let card = null;
			for (const node of root.children) {
				if (node.type === 'mdxjsEsm') { out.push(node); continue; }
				if (isH2(node)) {
					card = { type: 'element', tagName: 'section', properties: { class: 'card' }, children: [] };
					out.push(card);
				}
				if (card) card.children.push(node);
				else out.push(node);
			}
			ctx.replaceNode(root, { type: 'root', children: out });
		},
	};
}
