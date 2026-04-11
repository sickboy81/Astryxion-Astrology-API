import { FastifyInstance } from "fastify";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { calculateNatalChart, NatalChartBodySchema } from "../services/calculation.service.js";
import { HouseSystemSchema } from "../lib/astro/house-systems.js";
import { errorBody, nowUtcIso } from "../lib/utils.js";
import { renderNatalWheelAndGrid, renderNatalWheelSvg } from "../lib/chart-svg-api.js";

const ChartThemeSchema = z.enum(["lavender", "light", "dark", "minimal"]).optional().default("lavender");

const PersonLocSchema = z.object({
  date: z.string().min(1),
  timeUtc: z.string().min(1),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

const NatalChartSvgBodySchema = NatalChartBodySchema.extend({
  size: z.number().int().min(200).max(800).optional().default(400),
  transparentBackground: z.boolean().optional().default(false),
  includeAllBodies: z.boolean().optional().default(false),
  theme: ChartThemeSchema,
  /**
   * When true, returns `chartWheel` + `chartGrid` (wheel + tabular SVG). Default wheel aspects off unless `drawWheelAspects` is true.
   */
  splitChart: z.boolean().optional().default(false),
  drawWheelAspects: z.boolean().optional(),
  gridWidth: z.number().int().min(280).max(720).optional().default(420),
  /** `json` returns `{ chart: "<svg>..." }`; `svg` returns raw `image/svg+xml`. */
  format: z.enum(["json", "svg"]).optional().default("json"),
});

const SynastryChartSvgBodySchema = z.object({
  person1: PersonLocSchema,
  person2: PersonLocSchema,
  houseSystem: HouseSystemSchema.default("placidus"),
  size: z.number().int().min(200).max(800).optional().default(360),
  transparentBackground: z.boolean().optional().default(false),
  includeAllBodies: z.boolean().optional().default(false),
  theme: ChartThemeSchema,
});

export async function registerChartSvgRoutes(app: FastifyInstance) {
  app.post("/api/v1/chart/natal-svg", {
    schema: {
      tags: ["Western"],
      summary: "Natal wheel as SVG",
      description:
        "Returns a tropical natal chart wheel as an SVG string (JSON) or raw `image/svg+xml`. Optional `splitChart` adds a tabular `chartGrid` SVG. Themes: lavender/light, dark, minimal. Planets are filtered to the main set unless `includeAllBodies` is true.",
      body: zodToJsonSchema(NatalChartSvgBodySchema),
    },
  }, async (req, reply) => {
    const parsed = NatalChartSvgBodySchema.safeParse(req.body);
    if (!parsed.success) {
      return reply.code(400).send(errorBody("VALIDATION_ERROR", "Invalid payload.", parsed.error.flatten()));
    }
    const {
      size,
      transparentBackground,
      includeAllBodies,
      format,
      theme,
      splitChart,
      drawWheelAspects,
      gridWidth,
      ...natalBody
    } = parsed.data;
    const wheelAspects = drawWheelAspects ?? !splitChart;
    const svgOptions = {
      transparentBackground,
      theme,
      omitAspectLines: !wheelAspects,
    } as const;
    try {
      const data = await calculateNatalChart(natalBody);
      if (splitChart) {
        const { wheel, grid } = renderNatalWheelAndGrid(data, {
          size,
          includeAllBodies,
          svgOptions,
          gridWidth,
        });
        if (format === "svg") {
          return reply
            .code(400)
            .send(errorBody("VALIDATION_ERROR", "Use format=json when splitChart is true (two SVG documents)."));
        }
        return {
          generatedAtUtc: nowUtcIso(),
          mimeType: "image/svg+xml",
          chartWheel: wheel,
          chartGrid: grid,
          houseSystem: natalBody.houseSystem,
          theme,
        };
      }
      const svg = renderNatalWheelSvg(data, {
        size,
        includeAllBodies,
        svgOptions,
      });
      if (format === "svg") {
        return reply.type("image/svg+xml; charset=utf-8").send(svg);
      }
      return {
        generatedAtUtc: nowUtcIso(),
        mimeType: "image/svg+xml",
        chart: svg,
        houseSystem: natalBody.houseSystem,
        theme,
      };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Calculation error";
      return reply.code(500).send(errorBody("CALCULATION_ERROR", msg));
    }
  });

  app.post("/api/v1/chart/synastry-svg", {
    schema: {
      tags: ["Western"],
      summary: "Two natal wheels for synastry context",
      description:
        "Computes two separate natal wheels (person1 and person2) for side-by-side embedding. Does not draw aspect lines between charts (use `/api/v1/synastry` for inter-chart aspects).",
      body: zodToJsonSchema(SynastryChartSvgBodySchema),
    },
  }, async (req, reply) => {
    const parsed = SynastryChartSvgBodySchema.safeParse(req.body);
    if (!parsed.success) {
      return reply.code(400).send(errorBody("VALIDATION_ERROR", "Invalid payload.", parsed.error.flatten()));
    }
    const { person1, person2, houseSystem, size, transparentBackground, includeAllBodies, theme } = parsed.data;
    try {
      const [natal1, natal2] = await Promise.all([
        calculateNatalChart({ ...person1, houseSystem }),
        calculateNatalChart({ ...person2, houseSystem }),
      ]);
      const opts = { size, includeAllBodies, svgOptions: { transparentBackground, theme } as const };
      return {
        generatedAtUtc: nowUtcIso(),
        mimeType: "image/svg+xml",
        charts: {
          person1: renderNatalWheelSvg(natal1, opts),
          person2: renderNatalWheelSvg(natal2, opts),
        },
        houseSystem,
        theme,
      };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Calculation error";
      return reply.code(500).send(errorBody("CALCULATION_ERROR", msg));
    }
  });
}
