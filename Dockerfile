# Single-service image: API + static landing (Fastify). Use with Redis (e.g. Upstash) via REDIS_URL.

FROM node:22-bookworm-slim AS build
WORKDIR /app
# sweph (node-gyp) precisa de toolchain C++ no build; a imagem slim não traz isso por defeito.
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*
COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.json ./
COPY src ./src
COPY landing ./landing
RUN npm run build \
    && npm prune --omit=dev

FROM node:22-bookworm-slim AS run
WORKDIR /app
ENV NODE_ENV=production
RUN apt-get update && apt-get install -y --no-install-recommends \
    chromium \
    ca-certificates \
    fonts-liberation \
    && rm -rf /var/lib/apt/lists/*
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
COPY package.json package-lock.json ./
# node_modules vem do estágio build (addon nativo já compilado); evita g++/python na imagem final.
COPY --from=build /app/node_modules ./node_modules
RUN npm cache clean --force
COPY --from=build /app/dist ./dist
COPY landing ./landing
COPY ephe ./ephe
ENV SWEPH_EPHE_PATH=/app/ephe
EXPOSE 3000
CMD ["node", "dist/index.js"]
