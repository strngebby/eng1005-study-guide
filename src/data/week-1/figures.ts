// Week 1 figures, copied from week1.html. See src/lib/figure3d.ts for the item format.
import { add, type FigDef } from '../../lib/figure3d';

export const FIG: Record<string, FigDef> = {
	comp: { cap: 'A vector (2, 3, 2) split into its x, y and z moves.', items: [['v', [0, 0, 0], [2, 3, 2], 'a', 'v'], ['d', [0, 0, 0], [2, 0, 0], 'b'], ['d', [2, 0, 0], [2, 3, 0], 'b'], ['d', [2, 3, 0], [2, 3, 2], 'b']] },
	add: { cap: 'Tip-to-tail: a, then b, gives a + b.', items: [['v', [0, 0, 0], [3, 1, 0], 'a', 'a'], ['v', [3, 1, 0], [3.5, 3, 2], 'b'], ['t', [3.4, 2.2, 0.8], 'b', 'b'], ['v', [0, 0, 0], [3.5, 3, 2], 'c', 'a+b']] },
	dot: { cap: 'The shadow of b on a has length |b| cos θ.', items: [['v', [0, 0, 0], [1, 4, 0], 'a', 'a'], ['v', [0, 0, 0], [1.6, 1.8, 2.4], 'b', 'b'], ['d', [1.6, 1.8, 2.4], [0.52, 2.07, 0], 'd'], ['v', [0, 0, 0], [0.52, 2.07, 0], 'c', 'proj']] },
	cross: { cap: 'a × b is perpendicular to the parallelogram. Its length is the shaded area.', items: [['p', [[0, 0, 0], [3, 0, 0], [4, 2.5, 0], [1, 2.5, 0]]], ['v', [0, 0, 0], [3, 0, 0], 'a', 'a'], ['v', [0, 0, 0], [1, 2.5, 0], 'b', 'b'], ['v', [0, 0, 0], [0, 0, 3], 'c', 'a×b']] },
	triple: {
		cap: 'Three edge vectors span a parallelepiped.',
		items: (() => {
			const a = [3, 0, 0], b = [0.8, 2.4, 0], c = [0.6, 0.8, 2.4], O = [0, 0, 0];
			const r: any[] = [['p', [O, a, add(a, b), b]], ['v', O, a, 'a', 'a'], ['v', O, b, 'b', 'b'], ['v', O, c, 'c', 'c']];
			[[a, add(a, b)], [b, add(a, b)], [c, add(c, a)], [c, add(c, b)], [add(c, a), add(add(c, a), b)], [add(c, b), add(add(c, a), b)], [a, add(a, c)], [b, add(b, c)], [add(a, b), add(add(a, b), c)]].forEach((e) => r.push(['d', e[0], e[1], 'd']));
			return r;
		})(),
	},
	line: { cap: 'Start at point a, then travel any multiple s of direction b.', items: [['s', [-0.5, -0.2, 0.4], [3.5, 3.8, 2.8], 'a'], ['v', [0, 0, 0], [1, 1.3, 1.3], 'b'], ['t', [0.4, 0.52, 0.2], 'a', 'b'], ['v', [1, 1.3, 1.3], [2, 2.3, 1.9], 'c', 'b']] },
	skew: { cap: 'Skew lines: the shortest link (dashed) is at right angles to both.', items: [['s', [-1, 1, 0], [4, 1, 0], 'a', 'L1'], ['s', [1.5, -1, 2], [1.5, 4, 2], 'b', 'L2'], ['d', [1.5, 1, 0], [1.5, 1, 2], 'c'], ['t', [1.5, 1, 1], 'd', 'c']] },
	plane: { cap: 'Two directions b₁ and b₂ sweep out the plane. n points straight out of it.', items: [['p', [[-0.5, -0.5, 1], [3.5, -0.5, 1], [3.5, 3.5, 1], [-0.5, 3.5, 1]]], ['v', [1, 1, 1], [3, 1, 1], 'a', 'b1'], ['v', [1, 1, 1], [1, 3, 1], 'b', 'b2'], ['v', [1, 1, 1], [1, 1, 3], 'c', 'n']] },
};
