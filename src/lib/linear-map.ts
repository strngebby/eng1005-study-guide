/**
 * Interactive 2D transformation figure (ported from the reference page).
 * Draws the unit square and an L shape before and after the matrix [a b; c d].
 */
export type Mat = [number, number, number, number];
export const PRESETS: [string, Mat][] = [['Identity', [1, 0, 0, 1]], ['Rotate 90°', [0, -1, 1, 0]], ['Reflect', [-1, 0, 0, 1]], ['Stretch', [2, 0, 0, 0.5]], ['Shear', [1, 1, 0, 1]], ['Project', [0.5, 0.5, 0.5, 0.5]]];

export function renderLin([a, b, c, d]: Mat): string {
	const k = 40;
	const T = (p: number[]) => [a * p[0] + b * p[1], c * p[0] + d * p[1]];
	const pts = (l: number[][]) => l.map((p) => [p[0] * k, -p[1] * k].join(',')).join(' ');
	const sq = [[0, 0], [1, 0], [1, 1], [0, 1]], L = [[0.2, 0.15], [0.75, 0.15], [0.75, 0.35], [0.4, 0.35], [0.4, 0.85], [0.2, 0.85]];
	let h = '';
	for (let i = -4; i <= 4; i++) h += `<path d="M${i * k},-130V130M-160,${i * k}H160" style="stroke:var(--line);stroke-width:${i ? 0.6 : 1.8}"/>`;
	h += `<polygon points="${pts(sq)}" style="fill:none;stroke:var(--dim);stroke-dasharray:4 3"/><polygon points="${pts(sq.map(T))}" style="fill:var(--accent);fill-opacity:.18;stroke:var(--accent);stroke-width:2"/><polygon points="${pts(L.map(T))}" style="fill:var(--b)"/>`;
	return h;
}

export function captionLin([a, b, c, d]: Mat): string {
	const det = a * d - b * c;
	return `Matrix [${a} ${b}; ${c} ${d}], det = ${+det.toFixed(2)}. ${Math.abs(det) < 1e-9 ? 'The square is flattened.' : det < 0 ? 'Orientation is flipped.' : 'Orientation is kept.'}`;
}
