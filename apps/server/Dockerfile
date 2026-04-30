# ──────────────────────────────────────────────────────────────
# Stage 1: install dependencies and generate Prisma client
# ──────────────────────────────────────────────────────────────
FROM oven/bun:1.3.13 AS builder
WORKDIR /app

# Copy monorepo workspace manifests and lockfile first (layer caching)
COPY package.json bunfig.toml bun.lock ./
COPY packages/shared/package.json ./packages/shared/package.json
COPY apps/server/package.json ./apps/server/package.json

# Install all workspace dependencies from the monorepo root
RUN bun Install
# Copy shared package source (required by apps/server at runtime)
COPY packages/shared/ ./packages/shared/

# Copy server source
COPY apps/server/ ./apps/server/

WORKDIR /app/apps/server
RUN bunx prisma generate

# Remove dev-only files that aren't needed at runtime
RUN rm -rf node_modules/.cache

# ──────────────────────────────────────────────────────────────
# Stage 2: lean production image
# ──────────────────────────────────────────────────────────────
FROM oven/bun:1.3.13-slim AS runtime

LABEL org.opencontainers.image.source="https://github.com/Supporterino/FreezerTracker"
LABEL org.opencontainers.image.description="FreezerMan server API"

# Run as non-root user for security
RUN addgroup --system --gid 10001 appgroup && \
    adduser --system --uid 10001 --ingroup appgroup appuser

WORKDIR /app

# Copy the fully-prepared workspace from builder
COPY --from=builder /app/package.json /app/bunfig.toml /app/bun.lock ./
COPY --from=builder /app/node_modules/ ./node_modules/
COPY --from=builder /app/packages/shared/ ./packages/shared/
COPY --from=builder /app/apps/server/ ./apps/server/

WORKDIR /app/apps/server

USER appuser

EXPOSE 3000

# Run migrations then start the server.
# 'prisma migrate deploy' applies any pending migrations against the live DB at startup.
# It is idempotent and safe to run on every container start.
CMD ["sh", "-c", "bunx prisma migrate deploy && bun run src/main.ts"]
