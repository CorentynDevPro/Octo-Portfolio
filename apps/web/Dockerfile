# ============================================================
# Dockerfile – apps/web (Nuxt.js)
# Multi-stage build for production
# ============================================================

# ----- Stage 1: Build -----
FROM node:20-alpine AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.15.9 --activate

WORKDIR /app

# Copy workspace files
COPY package.json pnpm-workspace.yaml turbo.json ./
COPY apps/web/package.json ./apps/web/

# Install dependencies
RUN pnpm install --frozen-lockfile --filter @octo-portfolio/web

# Copy source
COPY apps/web ./apps/web

# Build
RUN pnpm --filter @octo-portfolio/web build

# ----- Stage 2: Production runtime -----
FROM node:20-alpine AS runner

WORKDIR /app

# Copy built output
COPY --from=builder /app/apps/web/.output ./

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "server/index.mjs"]
