# Auditoria: coordenadas trópicas vs siderais (rotas “védicas”)

Data do relatório: alinhado ao código em `src/` (Swiss Ephemeris via `sweph`).

## Resumo executivo

| Afirmação comum no marketing | Situação no código |
|-----------------------------|-------------------|
| **Lahiri (ayanamsa Swiss)** | **Sim** onde `zodiacMode: "sidereal_lahiri"` — `SE_SIDM_LAHIRI`, `SEFLG_SIDEREAL`, fila global em `withSwephSiderealWork` (`src/lib/sweph-zodiac.ts`). |
| **`POST /api/v1/vedic-chart`** | **`zodiacMode` opcional (default `tropical`):** trópico + **ayanamsa linear** legada (`calculateAyanamsa`) — **ou** **`sidereal_lahiri`:** planetas via `calculatePlanets` sideral Swiss + `coordinateModel.ayanamsaDegrees` (Lahiri). |
| **Rotas em `vedic-routes/routes.ts`** | `calculatePlanets` / `calculateAscendant` com **`zodiacMode`** (`tropical` \| `sidereal_lahiri`); respostas incluem `coordinateModel` quando aplicável. |
| **`POST /api/v1/vedic/panchang-detailed`** | **`zodiacMode` opcional (default `tropical`):** Sol/Lua para yoga/karana/nakshatra via `getSunMoonLongitudes` (trópico MOSEPH ou Lahiri sideral); resposta inclui `coordinateModel`. Tithi continua baseado em ciclo lunar aproximado por JD (não muda com modo). |

**Conclusão:** clientes que precisam **Jyotish Lahiri** devem enviar **`zodiacMode: "sidereal_lahiri"`** em rotas que suportam o campo; o default **`tropical`** preserva comportamento legado onde ainda há trópico ou aproximação linear.

---

## Funções de base

| Origem | Flags / método | Zodíaco |
|--------|----------------|---------|
| `calculatePlanets`, `calculateAscendant` (`calculation.service.ts`) | `tropical` → `SEFLG_MOSEPH`; `sidereal_lahiri` → `SE_SIDM_LAHIRI` + `SEFLG_SIDEREAL` | Conforme `zodiacMode` |
| `getSunMoonLongitudes` (`astronomy.service.ts`) | Idem para Sol/Lua | Conforme `zodiacMode` |
| `calculateNatalChart` | `SEFLG_MOSEPH` | **Trópico** (natal ocidental) |
| `calculateAyanamsa(jd)` (`astro-calculations.ts`) | fórmula linear | **Aproximação**, não Lahiri — usada só no ramo legado de `/vedic-chart` |

---

## Tabela por endpoint (atualizada)

Legenda: **T** = trópico (default); **L** = `sidereal_lahiri` via Swiss; **C** = corpo do pedido; **A** = trópico + ayanamsa linear (legado).

| Método | Rota | Fonte das longitudes | Notas |
|--------|------|----------------------|-------|
| POST | `/api/v1/vedic-chart` | **A** ou **L** | `zodiacMode` no body: default **tropical** = legado **A**; **sidereal_lahiri** = Swiss + `coordinateModel`. |
| POST | `/api/v1/vedic/panchang-detailed` | **T** ou **L** | `zodiacMode`: Sol/Lua alinhados para yoga, karana, nakshatra; `coordinateModel` na resposta. |
| POST | `/api/v1/vedic-complete`, demais em `vedic-routes` | **T** / **L** | `zodiacMode` no body dos schemas partilhados. |
| POST | `/api/v1/nakshatra` | **C** | Longitude 0–360° — sistema definido pelo cliente. |

---

## Recomendações (produto / engenharia)

1. **OpenAPI / clientes:** documentar `zodiacMode` e o default **`tropical`** vs **`sidereal_lahiri`** por rota.
2. **Landing:** só prometer “Lahiri” quando o cliente usar **`sidereal_lahiri`** (ou rotas que já fixam Lahiri).

---

## Referências de código

- `src/lib/sweph-zodiac.ts` — mutex, `ZodiacMode`, flags Lahiri.
- `src/services/calculation.service.ts` — `calculatePlanets`, `calculateAscendant`.
- `src/services/astronomy.service.ts` — `getSunMoonLongitudes`, `getVedicYoga`, `getVedicKarana`.
- `src/routes/advanced-astrology.ts` — `POST /api/v1/vedic-chart`.
- `src/routes/vedic-advanced.ts` — `POST /api/v1/vedic/panchang-detailed`.
- `src/vedic-routes/routes.ts` — rotas védicas numeradas.
