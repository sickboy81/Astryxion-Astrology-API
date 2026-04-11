import { test } from "node:test";
import assert from "node:assert/strict";
import { detectAspectPatterns } from "./astro-calculations.js";
import type { AspectData, PlanetData } from "./lib/astro/types.js";

function asp(
  a: string,
  b: string,
  type: AspectData["type"],
  sep: number
): AspectData {
  return {
    a,
    b,
    type,
    symbol: "?",
    exactAngle: sep,
    orb: 0,
    separation: sep,
    applying: true,
  };
}

test("detectAspectPatterns finds Yod (quincunx-quincunx-sextile)", () => {
  const aspects: AspectData[] = [
    asp("Marte", "Saturno", "quincunx", 150),
    asp("Marte", "Plutão", "quincunx", 150),
    asp("Saturno", "Plutão", "sextile", 60),
  ];
  const p = detectAspectPatterns(aspects);
  const yod = p.find((x) => x.patternKey === "yod");
  assert.ok(yod);
  assert.deepEqual(new Set(yod!.planets), new Set(["Marte", "Saturno", "Plutão"]));
});

test("detectAspectPatterns finds Grand Cross", () => {
  const aspects: AspectData[] = [
    asp("A", "C", "opposition", 180),
    asp("B", "D", "opposition", 180),
    asp("A", "B", "square", 90),
    asp("A", "D", "square", 90),
    asp("C", "B", "square", 90),
    asp("C", "D", "square", 90),
  ];
  const p = detectAspectPatterns(aspects);
  const gc = p.find((x) => x.patternKey === "grandCross");
  assert.ok(gc);
});

test("detectAspectPatterns finds Stellium from planets", () => {
  const planets: PlanetData[] = [
    { id: 0, name: "Sol", longitude: 10, latitude: 0, distanceAu: 1, speedLongitude: 1, sign: "Áries", degree: 10, minutes: 0, house: 1, retrograde: false },
    { id: 1, name: "Mercúrio", longitude: 12, latitude: 0, distanceAu: 1, speedLongitude: 1, sign: "Áries", degree: 12, minutes: 0, house: 1, retrograde: false },
    { id: 2, name: "Vênus", longitude: 14, latitude: 0, distanceAu: 1, speedLongitude: 1, sign: "Áries", degree: 14, minutes: 0, house: 1, retrograde: false },
  ];
  const p = detectAspectPatterns([], planets);
  const st = p.find((x) => x.patternKey === "stellium");
  assert.ok(st);
});
