/**
 * Referência do pilar do dia: fórmula ND = floor(JD_UT + 0.5), tronco = (ND+9) mod 10, ramo = (ND+1) mod 12.
 * ND ≡ 11 (mod 60) → 甲子 — ponto fixo da tabela sexagesimal (comum em manuais e calculadoras).
 * Ano/mês no motor usam longitude solar (Swiss Ephemeris); validar datas limite com ferramenta externa de confiança.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { DateTime, FixedOffsetZone } from "luxon";
import { computeBaZi, sexagenaryDayIndicesFromJdn } from "./bazi.js";

test("sexagenaryDayIndicesFromJdn: ND=11 → 甲子 (índices 0,0)", () => {
  const { stem, branch } = sexagenaryDayIndicesFromJdn(11);
  assert.equal(stem, 0);
  assert.equal(branch, 0);
});

test("computeBaZi: pilar do dia = sexagenaryDayIndicesFromJdn no meio-dia civil local (UTC+offset)", async () => {
  const sweph = await import("sweph");
  const cal = sweph.constants.SE_GREG_CAL;
  const offset = 480;
  const birthDate = "2024-06-15";
  const birthTimeUtc = "02:30:00";
  const result = await computeBaZi({ birthDate, birthTimeUtc, timezoneOffsetMinutes: offset }, "en");

  const local = DateTime.fromISO(`${birthDate}T${birthTimeUtc}`, { zone: "utc" }).plus({ minutes: offset });
  const zone = FixedOffsetZone.instance(offset / 60);
  const noonLocal = DateTime.fromObject(
    { year: local.year, month: local.month, day: local.day, hour: 12, minute: 0, second: 0 },
    { zone }
  );
  const u = noonLocal.toUTC();
  const jdUt = sweph.utc_to_jd(u.year, u.month, u.day, u.hour, u.minute, Math.floor(u.second), cal).data[1] as number;
  const jdn = Math.floor(jdUt + 0.5);
  const ref = sexagenaryDayIndicesFromJdn(jdn);

  assert.equal(result.pillars.day.stemIndex, ref.stem);
  assert.equal(result.pillars.day.branchIndex, ref.branch);
});

/**
 * Âncora de regressão: 1984-02-02 12:00 UTC, offset 0, meio-dia civil = meio-dia UTC → par 丙寅 com este motor (Swiss + ND).
 * Cruzar com uma tabela ou app de Ba Zi de confiança para o mesmo instante e fuso; se divergir, ajustar regra do pilar do dia (ex. meia-noite solar).
 */
test("computeBaZi: 1984-02-02 meio-dia UTC — par Han estável (丙寅)", async () => {
  const r = await computeBaZi(
    { birthDate: "1984-02-02", birthTimeUtc: "12:00:00", timezoneOffsetMinutes: 0 },
    "en"
  );
  assert.equal(r.pillars.day.stemChar + r.pillars.day.branchChar, "丙寅");
});
