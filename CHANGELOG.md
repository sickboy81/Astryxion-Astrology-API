# Changelog

## Unreleased

- **Ops:** README **Production checklist** (env, Redis backup, uptime, metrics). **`render.yaml`** gera **`METRICS_BEARER_TOKEN`** por defeito. Workflow opcional [`.github/workflows/health-check-scheduled.yml`](.github/workflows/health-check-scheduled.yml) se existir variável `HEALTHCHECK_URL`.
- **Ops (doc):** [docs/OPERATIONS.md](./docs/OPERATIONS.md) — inventário Redis, backups, monitorização. `GET /metrics` com **`METRICS_BEARER_TOKEN`** (Bearer ou `X-Metrics-Token`).
- **CI / supply chain:** `npm audit --omit=dev --audit-level=moderate` in GitHub Actions; Dependabot for **npm** (weekly) and **GitHub Actions** (monthly) via `.github/dependabot.yml`.
- **Repo hygiene:** Removed `server.log`, `src/i18n.ts.bak`, `src/astro-calculations.ts.bak`. `.gitignore` now ignores `*.bak`, `.cursor/`, `mcps/`, `.opencode/`.
- **Security / production hardening:** Playground (`/dashboard`) no longer embeds `dev_test_key` when `NODE_ENV=production`; users paste a key (stored in `localStorage`). Code snippets use `YOUR_API_KEY`. Removed leaked OpenRouter key from repo — use **`.openclaude-profile.example.json`** and a **gitignored** `.openclaude-profile.json` locally; **rotate** any key that was ever committed. Deleted `dashboard.js.tmp`. Validation / 401 / 429 responses use generic messages in production. `.gitignore` / `.dockerignore` extended (`*.tmp`, local Claude profile).
- **Legal:** Root **LICENSE** is now **proprietary** (English); no third-party use or commercial use without written permission. `package.json` declares **`UNLICENSED`**.
- **Portal / dev:** When `NODE_ENV` is not `production` and `INTERNAL_SECRET` is unset, the server uses a **dev-only in-process fallback** so **`POST /api/v1/portal/sandbox/proxy`** and **`POST /api/mcp/call_tool`** work without `.env` (production still requires `INTERNAL_SECRET` ≥ 32 chars).
- **Vedic / i18n:** `GET /api/v1/nakshatras` and `POST /api/v1/nakshatra` — localized **symbol**, **nature**, **guna**, **element**, **animal**, **tree**, **direction**, **caste**, **gender**, **dosha**, **favorableActivities**, **unfavorableActivities**, **compatibility** (partner mansion labels), plus **deity**, **description**, **lord** in **en / pt / es / hi**; `name` / `sanskritName` stay canonical keys. **Pañcāṅga** localizes tithi/vara/karana **deity** labels; **27 yogas** classical Sun+Moon sum (incl. **Vajra**, **Siddhi**).
- **Docs:** `landing/features.html` and `landing/index.html` — Vedic/panchanga copy updated for nakshatra catalog i18n and classical 27 yogas / deity labels.
- **Vedic:** `POST /api/v1/vedic/panchang-detailed` — optional **`zodiacMode`** (`tropical` \| `sidereal_lahiri`, default `tropical`); Sol/Lua coerentes para yoga, karana e nakshatra; resposta inclui **`coordinateModel`**.
- **Vedic:** `POST /api/v1/vedic-chart` — optional **`zodiacMode`**: **`sidereal_lahiri`** usa efemérides Swiss Lahiri (`calculatePlanets`) e **ayanamsa** do Swiss; default **`tropical`** mantém mapa trópico + ayanamsa linear legada.
- **Vedic:** rótulos de **planetas** e **signos** (casas, navamsa/dasamsa no `vedic-chart`) via **`lang`** (`en` \| `pt` \| `es` \| `hi`, default **`en`**) em `POST /api/v1/vedic-chart`, `POST /api/v1/vedic-complete`, `POST /api/v1/vedic/vargottama`, Shadbala/Ashtakavarga/Graha Yuddha/Avasthas/Gochara/Prasna/Argala-Drishti (corpos que usam `shadbalaSchema` ou equivalente). Os cálculos continuam a usar nomes internos em português; só a **resposta JSON** é localizada.
- **Docs:** [`docs/VEDIC_COORDINATE_AUDIT.md`](./docs/VEDIC_COORDINATE_AUDIT.md) — audit of tropical vs sidereal/Lahiri claims per route.
- **Fix:** `POST /api/v1/vedic-chart` Vimshottari Dasha now uses `calculateVimshottariDasha` from `vedic-astrology.ts` with **sidereal moon longitude once** and a proper `Date` (avoids double ayanamsa subtraction and wrong second argument to the old stub).

## 2.5.0

- **Western chart SVG:** `theme` (`lavender` / `light`, `dark`, `minimal`), optional **`splitChart`** returning `chartWheel` + `chartGrid` (tabular SVG), and `drawWheelAspects` to control aspect lines when split.
- **Synastry SVG:** `theme` on `POST /api/v1/chart/synastry-svg`.
- **LLM context:** `POST /api/v1/natal/llm-context` — natal summary as XML (`response: json` | `xml`).
- **Vedic:** `vargottama` block on `POST /api/v1/vedic-complete` and dedicated `POST /api/v1/vedic/vargottama` (engine D1/D9 sign parity; see `methodology` in the payload).
- **Ops:** `/health` includes `components.chartSvg`; `package.json` version aligned with OpenAPI **2.5.0**; root **LICENSE** (proprietary).
