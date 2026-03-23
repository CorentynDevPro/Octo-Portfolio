# ============================================================
# Dockerfile – apps/api (Nitro standalone API)
# Multi-stage build for production
# ============================================================

# ----- Stage 1: Build -----
FROM node:20-alpine AS builder

RUN corepack enable && corepack prepare pnpm@9.15.9 --activate

WORKDIR /app

COPY package.json pnpm-workspace.yaml turbo.json ./
COPY apps/api/package.json ./apps/api/

RUN pnpm install --frozen-lockfile --filter @octo-portfolio/api

COPY apps/api ./apps/api

RUN pnpm --filter @octo-portfolio/api build

# ----- Stage 2: Production runtime -----
FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/apps/api/.output ./

ENV NODE_ENV=production
ENV PORT=4000

EXPOSE 4000

CMD ["node", "server/index.mjs"]
