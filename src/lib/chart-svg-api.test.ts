import { test } from "node:test";
import assert from "node:assert/strict";
import { buildPlanetsForWheel, generateNatalPositionsGridSvg } from "./chart-svg-api.js";

test("buildPlanetsForWheel filters asteroids by default", () => {
  const data = {
    planets: [
      { name: "Sun", sign: "Leo", longitude: 120, house: 1 },
      { name: "Ceres", sign: "Ari", longitude: 10, house: 1 },
    ],
    houses: { cusps: Array(12).fill(0) },
    angles: { lunarNode: 90, southNode: 270 },
  };
  const out = buildPlanetsForWheel(data, false);
  assert.ok(out.some((p) => p.name === "Sun"));
  assert.ok(!out.some((p) => p.name === "Ceres"));
  assert.ok(out.some((p) => p.name === "North Node"));
});

test("buildPlanetsForWheel includeAllBodies keeps Ceres", () => {
  const data = {
    planets: [{ name: "Ceres", sign: "Ari", longitude: 10, house: 1 }],
    houses: { cusps: Array(12).fill(0) },
    angles: { lunarNode: null, southNode: null },
  };
  const out = buildPlanetsForWheel(data, true);
  assert.ok(out.some((p) => p.name === "Ceres"));
});

test("generateNatalPositionsGridSvg returns SVG table markup", () => {
  const svg = generateNatalPositionsGridSvg(
    [{ name: "Sun", sign: "Leo", longitude: 120, house: 1, retrograde: false }],
    { theme: "minimal", transparentBackground: true }
  );
  assert.ok(svg.includes("<svg"));
  assert.ok(svg.includes("Sun"));
  assert.ok(svg.includes("Corpo"));
});
