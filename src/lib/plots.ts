/**
 * Drawing code for the Week 4–7 interactive figures (ported from the
 * reference page). Each pair renders the SVG body and the caption text, and
 * is used both at build time (first frame) and in the browser.
 */
export type Mat = [number, number, number, number];
const f2 = (n: number) => +n.toFixed(2);
const grid = (n: number, k: number) => { let h = ''; for (let i = -n; i <= n; i++) h += `<path d="M${i * k},-130V130M-160,${i * k}H160" style="stroke:var(--line);stroke-width:${i ? 0.6 : 1.8}"/>`; return h; };

/* ---------- eigenvector figure ---------- */
export const EIG_PRESETS: [string, Mat][] = [['Stretch', [2, 0, 0, 0.5]], ['Symmetric', [1.5, 0.5, 0.5, 1.5]], ['Shear', [1, 1, 0, 1]], ['Reflect', [0, 1, 1, 0]], ['Rotate', [0, -1, 1, 0]]];

export function drawEig([a, b, c, d]: Mat, deg: number): { svg: string; cap: string } {
	const t = (deg * Math.PI) / 180, k = 45;
	const v = [Math.cos(t), Math.sin(t)], w = [a * v[0] + b * v[1], c * v[0] + d * v[1]];
	const arrow = (p: number[], col: string, l: string) => {
		const x = p[0] * k, y = -p[1] * k, g = Math.atan2(y, x);
		const head = Math.hypot(x, y) > 4 ? `<polygon points="${x},${y} ${x - 10 * Math.cos(g - 0.4)},${y - 10 * Math.sin(g - 0.4)} ${x - 10 * Math.cos(g + 0.4)},${y - 10 * Math.sin(g + 0.4)}" style="fill:${col}"/>` : '';
		return `<line x2="${x}" y2="${y}" style="stroke:${col};stroke-width:3"/>${head}<text x="${x + 7}" y="${y - 5}" style="fill:${col}">${l}</text>`;
	};
	let h = grid(3, k) + `<circle r="${k}" style="fill:none;stroke:var(--dim);stroke-dasharray:4 3"/>`;
	const tr = a + d, det = a * d - b * c, disc = tr * tr - 4 * det;
	let info: string;
	if (disc < -1e-9) info = `Eigenvalues ${f2(tr / 2)} ± ${f2(Math.sqrt(-disc) / 2)}i. They are complex, so no real direction is kept.`;
	else {
		const r = Math.sqrt(Math.max(disc, 0)), ls = r < 1e-6 ? [tr / 2] : [(tr + r) / 2, (tr - r) / 2];
		const all = Math.abs(b) < 1e-9 && Math.abs(c) < 1e-9 && Math.abs(a - d) < 1e-9;
		if (!all) ls.forEach((l) => {
			let e = Math.abs(b) > 1e-9 || Math.abs(a - l) > 1e-9 ? [b, l - a] : [l - d, c];
			if (Math.hypot(e[0], e[1]) < 1e-9) e = [l - d, c];
			const n = Math.hypot(e[0], e[1]);
			if (n > 1e-9) h += `<line x1="${(-e[0] / n) * 200}" y1="${(e[1] / n) * 200}" x2="${(e[0] / n) * 200}" y2="${(-e[1] / n) * 200}" style="stroke:var(--c);stroke-width:1.5;stroke-dasharray:6 4"/>`;
		});
		info = all ? `λ = ${f2(a)}: every direction is an eigenvector.` : `Eigenvalues ${ls.map(f2).join(' and ')}${ls.length < 2 ? ' (repeated, one direction)' : ''}. Dashed lines are eigenvector directions.`;
	}
	h += arrow(w, 'var(--b)', 'Av') + arrow(v, 'var(--accent)', 'v');
	const n = Math.hypot(w[0], w[1]), on = n < 1e-9 || Math.abs(v[0] * w[1] - v[1] * w[0]) / n < 0.035;
	return { svg: h, cap: `[${a} ${b}; ${c} ${d}]. ${on ? `v is an eigenvector here: Av ≈ ${f2(v[0] * w[0] + v[1] * w[1])}v. ` : ''}${info}` };
}

/* ---------- contour map ---------- */
type Fn = (x: number, y: number) => number;
export const CONTOUR_SETS: Record<string, [string, Fn][]> = {
	ct5: [['Bowl', (x, y) => x * x + y * y], ['Hill', (x, y) => 6 - x * x - 2 * y * y], ['Saddle', (x, y) => x * x - y * y], ['Slope', (x, y) => 2 * x + y]],
	ct6: [['Minimum', (x, y) => x * x + y * y], ['Maximum', (x, y) => -x * x - 2 * y * y], ['Saddle', (x, y) => x * y], ['Two points', (x, y) => x * x * x - 3 * x + y * y]],
};

export function drawContour(set: string, fn: number, x: number, y: number): { svg: string; cap: string } {
	const [name, F] = CONTOUR_SETS[set][fn], k = 52, X = 3.08, Y = 2.5, N = 62, M_ = 50, v: number[][] = [];
	for (let i = 0; i <= N; i++) { v.push([]); for (let j = 0; j <= M_; j++) v[i].push(F(-X + (2 * X * i) / N, -Y + (2 * Y * j) / M_)); }
	const all = v.flat(), lo = Math.min(...all), hi = Math.max(...all);
	let h = '';
	for (let n = 1; n < 16; n++) {
		const L = lo + ((hi - lo) * n) / 16 + 1e-6; let d = '';
		for (let i = 0; i < N; i++) for (let j = 0; j < M_; j++) {
			const c = [[i, j], [i + 1, j], [i + 1, j + 1], [i, j + 1]], q: number[][] = [];
			for (let e = 0; e < 4; e++) {
				const a = c[e], b = c[(e + 1) % 4], va = v[a[0]][a[1]], vb = v[b[0]][b[1]];
				if ((va < L) !== (vb < L)) { const t = (L - va) / (vb - va); q.push([(-X + (2 * X * (a[0] + t * (b[0] - a[0]))) / N) * k, -(-Y + (2 * Y * (a[1] + t * (b[1] - a[1]))) / M_) * k]); }
			}
			for (let e = 0; e + 1 < q.length; e += 2) d += `M${q[e][0].toFixed(1)},${q[e][1].toFixed(1)}L${q[e + 1][0].toFixed(1)},${q[e + 1][1].toFixed(1)}`;
		}
		h += `<path d="${d}" style="fill:none;stroke:var(--accent);stroke-width:1.1;opacity:${(0.3 + (0.7 * n) / 16).toFixed(2)}"/>`;
	}
	const e = 1e-4, gx = (F(x + e, y) - F(x - e, y)) / (2 * e), gy = (F(x, y + e) - F(x, y - e)) / (2 * e), g = Math.hypot(gx, gy), px = x * k, py = -y * k;
	if (g > 0.01) {
		const len = Math.min(g * 0.28, 1.4) * k, a = Math.atan2(-gy, gx), qx = px + len * Math.cos(a), qy = py + len * Math.sin(a);
		h += `<line x1="${px}" y1="${py}" x2="${qx}" y2="${qy}" style="stroke:var(--b);stroke-width:3"/><polygon points="${qx},${qy} ${qx - 10 * Math.cos(a - 0.4)},${qy - 10 * Math.sin(a - 0.4)} ${qx - 10 * Math.cos(a + 0.4)},${qy - 10 * Math.sin(a + 0.4)}" style="fill:var(--b)"/>`;
	}
	h += `<circle cx="${px}" cy="${py}" r="4.5" style="fill:var(--ink)"/>`;
	const r = (n: number) => +n.toFixed(2);
	return { svg: h, cap: `${name}: f(${x}, ${y}) = ${r(F(x, y))}. ∇f = (${r(gx) || 0}, ${r(gy) || 0}). ${g < 0.01 ? 'Critical point: the gradient is zero.' : 'The arrow (shortened) points straight uphill, across the contours.'} Stronger lines are higher.` };
}

/* ---------- hyperbolic functions graph ---------- */
export function drawHyp(x: number): { svg: string; cap: string } {
	const kx = 62, ky = 30;
	let h = '';
	for (let i = -4; i <= 4; i++) h += `<path d="M-160,${i * ky}H160${Math.abs(i) < 3 ? `M${i * kx},-130V130` : ''}" style="fill:none;stroke:var(--line);stroke-width:${i ? 0.6 : 1.8}"/>`;
	([['cosh', Math.cosh, 'var(--accent)'], ['sinh', Math.sinh, 'var(--b)'], ['tanh', Math.tanh, 'var(--c)']] as [string, (t: number) => number, string][]).forEach(([n, F, c], i) => {
		let d = '';
		for (let t = -2.5; t <= 2.501; t += 0.05) d += `${d ? 'L' : 'M'}${(t * kx).toFixed(1)},${(-F(t) * ky).toFixed(1)}`;
		h += `<path d="${d}" style="fill:none;stroke:${c};stroke-width:2.4"/><circle cx="${x * kx}" cy="${-F(x) * ky}" r="4" style="fill:${c}"/><text x="${-150}" y="${-110 + i * 17}" style="fill:${c}">${n}</text>`;
	});
	h += `<line x1="${x * kx}" x2="${x * kx}" y1="-130" y2="130" style="stroke:var(--dim);stroke-dasharray:4 3"/>`;
	const r = (n: number) => n.toFixed(3);
	return { svg: h, cap: `x = ${x}: cosh = ${r(Math.cosh(x))}, sinh = ${r(Math.sinh(x))}, tanh = ${r(Math.tanh(x))}. cosh² − sinh² = ${r(Math.cosh(x) ** 2 - Math.sinh(x) ** 2)}.` };
}
