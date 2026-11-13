/**
 * Small, deterministic helpers that produce hand-drawn looking SVG paths.
 * Deterministic (seeded) so server and client render identical markup.
 */

export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Pt = [number, number];
const r1 = (n: number) => Math.round(n * 10) / 10;

/** Smooth open curve through points (Catmull-Rom converted to cubic beziers). */
export function smooth(points: Pt[], closed = false): string {
  if (points.length < 2) return "";
  const pts = closed ? [points[points.length - 1], ...points, points[0], points[1]] : [points[0], ...points, points[points.length - 1]];
  let d = `M${r1(pts[1][0])} ${r1(pts[1][1])}`;
  for (let i = 1; i < pts.length - 2; i++) {
    const [p0, p1, p2, p3] = [pts[i - 1], pts[i], pts[i + 1], pts[i + 2]];
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${r1(c1[0])} ${r1(c1[1])} ${r1(c2[0])} ${r1(c2[1])} ${r1(p2[0])} ${r1(p2[1])}`;
  }
  return closed ? d + " Z" : d;
}

/**
 * A hand-drawn ellipse. `sweep` > 1 makes the stroke overshoot its start,
 * the way a pen circles a word.
 */
export function wobblyEllipse(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  { seed = 1, jitter = 0.04, points = 14, sweep = 1.08, start = -0.6 } = {},
): string {
  const rand = rng(seed);
  const n = Math.round(points * sweep);
  const pts: Pt[] = [];
  for (let i = 0; i <= n; i++) {
    const t = start + (i / n) * Math.PI * 2 * sweep;
    const drift = 1 + (rand() - 0.5) * jitter * 2 + (i / n) * jitter * 0.8;
    pts.push([cx + Math.cos(t) * rx * drift, cy + Math.sin(t) * ry * drift]);
  }
  return smooth(pts);
}

/** A slightly irregular line between two points. */
export function wobblyLine(x1: number, y1: number, x2: number, y2: number, { seed = 1, jitter = 2, segments = 5 } = {}): string {
  const rand = rng(seed);
  const pts: Pt[] = [];
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const off = i === 0 || i === segments ? 0 : (rand() - 0.5) * jitter * 2;
    pts.push([x1 + dx * t + nx * off, y1 + dy * t + ny * off]);
  }
  return smooth(pts);
}

/** Radiating light beams around a centre, each beam a slightly wobbly stroke. */
export function rays(cx: number, cy: number, inner: number, outer: number, count: number, seed = 3): string[] {
  const rand = rng(seed);
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2 + (rand() - 0.5) * 0.08;
    const len = outer * (0.78 + rand() * 0.32);
    const r0 = inner * (0.95 + rand() * 0.15);
    out.push(
      wobblyLine(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0, cx + Math.cos(a) * len, cy + Math.sin(a) * len, {
        seed: seed * 31 + i,
        jitter: 1.4,
        segments: 3,
      }),
    );
  }
  return out;
}

/** Four-point sparkle star path centred at x,y. */
export function sparkle(x: number, y: number, s: number): string {
  const k = s * 0.18;
  return `M${x} ${y - s} C${x + k} ${y - k} ${x + k} ${y - k} ${x + s} ${y} C${x + k} ${y + k} ${x + k} ${y + k} ${x} ${y + s} C${x - k} ${y + k} ${x - k} ${y + k} ${x - s} ${y} C${x - k} ${y - k} ${x - k} ${y - k} ${x} ${y - s} Z`;
}
