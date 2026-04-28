FROM oven/bun:1.3.13 AS base
WORKDIR /app

# Copy monorepo workspace manifests and lockfile first (layer caching)
COPY package.json bunfig.toml bun.lockb ./
COPY packages/shared/package.json ./packages/shared/package.json
COPY apps/server/package.json ./apps/server/package.json

# Install all workspace dependencies from the monorepo root
RUN bun install --frozen-lockfile

# Copy shared package source (required by apps/server at runtime)
COPY packages/shared/ ./packages/shared/

# Copy server source
COPY apps/server/ ./apps/server/

WORKDIR /app/apps/server
RUN bunx prisma generate

# Run migrations then start the server.
# 'prisma migrate deploy' applies any pending migrations against the live DB at startup.
# It is idempotent and safe to run on every container start.
CMD ["sh", "-c", "bunx prisma migrate deploy && bun run src/main.ts"]
