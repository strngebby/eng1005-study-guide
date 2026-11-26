// Week 2 figures, copied from the reference page. See src/lib/figure3d.ts for the item format.
import type { FigDef } from '../../lib/figure3d';

export const FIG: Record<string, FigDef> = {
	one2:{cap:'Two lines crossing once: one solution.',items:[['s',[0,0,0],[4,4,0],'a','L1'],['s',[0,4,0],[4,0,0],'b','L2'],['t',[2,2,0],'● one solution','c']]},
	none2:{cap:'Parallel lines never cross: no solution.',items:[['s',[0,0,0],[3,4,0],'a','L1'],['s',[1.4,0,0],[4.4,4,0],'b','L2']]},
	point3:{cap:'Three planes meeting at one point.',items:[['p',[[2,0,0],[2,4,0],[2,4,3],[2,0,3]]],['p',[[0,2,0],[4,2,0],[4,2,3],[0,2,3]]],['p',[[0,0,1.5],[4,0,1.5],[4,4,1.5],[0,4,1.5]]],['t',[2,2,1.5],'●','b']]},
	line3:{cap:'Three planes sharing one line (orange).',items:[['p',[[0,2,0],[4,2,0],[4,2,3],[0,2,3]]],['p',[[0,0,1.5],[4,0,1.5],[4,4,1.5],[0,4,1.5]]],['p',[[0,.8,.3],[4,.8,.3],[4,3.2,2.7],[0,3.2,2.7]]],['s',[0,2,1.5],[4,2,1.5],'b','solutions']]},
	none3:{cap:'Three parallel planes: no common point.',items:[.3,1.5,2.7].map((z):any=>['p',[[0,0,z],[4,0,z],[4,4,z],[0,4,z]]])},
} as any;
