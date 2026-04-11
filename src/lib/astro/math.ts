export function normalize360(angle: number): number {
  let a = angle % 360;
  if (a < 0) a += 360;
  return a;
}

export function angleDiff(a: number, b: number): number {
  const diff = Math.abs(a - b) % 360;
  return diff > 180 ? 360 - diff : diff;
}

export function houseOfLongitude(longitude: number, cusps: number[]): number {
  const lon = normalize360(longitude);
  for (let i = 0; i < 12; i++) {
    const start = normalize360(cusps[i]);
    const end = normalize360(cusps[(i + 1) % 12]);
    if (start < end) {
      if (lon >= start && lon < end) return i + 1;
    } else {
      if (lon >= start || lon < end) return i + 1;
    }
  }
  return 1;
}
