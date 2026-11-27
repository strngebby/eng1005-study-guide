// Week 6 figures, copied from the reference page. See src/lib/figure3d.ts for the item format.
import { add, type FigDef } from '../../lib/figure3d';

export const FIG: Record<string, FigDef> = {
	helix: { cap: 'A helix, (2 cos t, 2 sin t, kt), with one tangent vector.', items: (() => { const P = (t: number) => [2 * Math.cos(t), 2 * Math.sin(t), t * 0.22], r: any[] = []; for (let i = 0; i < 72; i++) r.push(['s', P((i * Math.PI) / 18), P(((i + 1) * Math.PI) / 18), 'a']); const t = 2 * Math.PI, p = P(t); r.push(['v', p, add(p, [0, 2, 0.22], 1), 'b', 'tangent']); return r; })() },
};
