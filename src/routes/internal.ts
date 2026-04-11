import { FastifyInstance } from "fastify";
import { errorBody, nowUtcIso } from "../lib/utils.js";
import { ZODIAC_SIGNS, HOROSCOPE_TTL_SECONDS } from "../data/constants.js";
import { buildHoroscope } from "../services/horoscope.service.js";

export async function registerInternalRoutes(app: FastifyInstance, cache: any) {
  app.post("/api/v1/internal/horoscope-refresh", { schema: { hide: true } }, async (req, reply) => {
    const token = req.headers["x-internal-token"];
    const expected = process.env.INTERNAL_CRON_TOKEN;
    if (!expected || token !== expected) {
      return reply.code(401).send(errorBody("UNAUTHORIZED", "Token interno inválido."));
    }

    const tags = ["horoscope:daily", "horoscope:weekly", "horoscope:monthly"];
    await cache.invalidateTags(tags);

    await Promise.all(
      ZODIAC_SIGNS.flatMap((sign) => [
        cache.setJson({
          key: `horoscope:v1:daily:${sign}`,
          value: buildHoroscope(sign, "daily"),
          ttlSeconds: HOROSCOPE_TTL_SECONDS.daily,
          tags: [`horoscope:${sign}`, "horoscope:daily"],
        }),
        cache.setJson({
          key: `horoscope:v1:weekly:${sign}`,
          value: buildHoroscope(sign, "weekly"),
          ttlSeconds: HOROSCOPE_TTL_SECONDS.weekly,
          tags: [`horoscope:${sign}`, "horoscope:weekly"],
        }),
        cache.setJson({
          key: `horoscope:v1:monthly:${sign}`,
          value: buildHoroscope(sign, "monthly"),
          ttlSeconds: HOROSCOPE_TTL_SECONDS.monthly,
          tags: [`horoscope:${sign}`, "horoscope:monthly"],
        }),
      ])
    );

    return { ok: true, refreshedAtUtc: nowUtcIso() };
  });
}
