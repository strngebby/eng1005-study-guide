/**
 * Tiny projector for the rotatable 3D figures (ported from week1.html).
 * Pure function: used on the server for the first frame and in the
 * browser whenever the slider moves.
 *
 * Item formats
 *   ['v', from, to, colour, label?]   vector (arrow)
 *   ['s', from, to, colour, label?]   segment / line (no arrow)
 *   ['d', from, to, colour]           dashed line
 *   ['t', at, text, colour]           text label
 *   ['p', [p1, p2, ...]]              shaded polygon
 * Colours: a = accent, b, c = secondary hues, i = ink, d = dim.
 */
export type P3 = [number, number, number] | number[];
export type FigItem =
	| ['v' | 's', P3, P3, string, string?]
	| ['d', P3, P3, string]
	| ['t', P3, string, string]
	| ['p', P3[]];
export interface FigDef { cap: string; items: FigItem[] }

const COL: Record<string, string> = { a: 'var(--accent)', b: 'var(--b)', c: 'var(--c)', i: 'var(--ink)', d: 'var(--dim)' };
export const add = (p: number[], q: number[], k = 1) => p.map((v, i) => v + k * q[i]);

export function render(items: FigItem[], deg: number): string {
	const t = (deg * Math.PI) / 180;
	const raw = (p: number[]) => {
		const x = p[0] * Math.cos(t) - p[1] * Math.sin(t), y = p[0] * Math.sin(t) + p[1] * Math.cos(t);
		return [y, -(p[2] * 0.92 - x * 0.4)];
	};
	const axes: [number[], string][] = [[[4, 0, 0], 'x'], [[0, 4, 0], 'y'], [[0, 0, 3.2], 'z']];
	const pts: number[][] = [[0, 0, 0], ...axes.map((a) => a[0])];
	items.forEach((i: any) => {
		if (i[0] === 'p') pts.push(...i[1]);
		else { pts.push(i[1]); if (i[0] !== 't') pts.push(i[2]); }
	});
	const r = pts.map(raw), xs = r.map((p) => p[0]), ys = r.map((p) => p[1]);
	const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
	const k = Math.min(270 / (x1 - x0), 210 / (y1 - y0));
	const P = (p: number[]) => { const q = raw(p); return [160 + (q[0] - (x0 + x1) / 2) * k, 130 + (q[1] - (y0 + y1) / 2) * k]; };
	const ln = (a: number[], b: number[], c: string, w: number, dash?: boolean) => {
		const A = P(a), B = P(b);
		return `<line x1="${A[0]}" y1="${A[1]}" x2="${B[0]}" y2="${B[1]}" style="stroke:${c};stroke-width:${w}" ${dash ? 'stroke-dasharray="5 4"' : ''}/>`;
	};
	const tx = (p: number[], s: string, c: string) => { const A = P(p); return `<text x="${A[0] + 6}" y="${A[1] - 5}" style="fill:${c}">${s}</text>`; };
	let h = axes.map((a) => ln([0, 0, 0], a[0], 'var(--line)', 1.5) + tx(a[0], a[1], COL.d)).join('');
	items.forEach((i: any) => {
		const [kind, a, b, c, l] = i;
		if (kind === 'p') h += `<polygon points="${a.map((p: number[]) => P(p).join(',')).join(' ')}" style="fill:var(--accent);fill-opacity:.16;stroke:var(--accent)"/>`;
		else if (kind === 't') h += tx(a, b, COL[c]);
		else if (kind === 'd') h += ln(a, b, COL[c], 1.6, true);
		else {
			h += ln(a, b, COL[c], 2.8);
			if (kind === 'v') {
				const A = P(a), B = P(b), g = Math.atan2(B[1] - A[1], B[0] - A[0]);
				h += `<polygon points="${B} ${B[0] - 11 * Math.cos(g - 0.4)},${B[1] - 11 * Math.sin(g - 0.4)} ${B[0] - 11 * Math.cos(g + 0.4)},${B[1] - 11 * Math.sin(g + 0.4)}" style="fill:${COL[c]}"/>`;
			}
			if (l) h += tx(b, l, COL[c]);
		}
	});
	return h;
}
