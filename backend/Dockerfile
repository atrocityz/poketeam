FROM oven/bun:1-alpine AS builder
WORKDIR /app

# For Prisma to work properly during build time
ENV DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

FROM oven/bun:1-alpine
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./
COPY --from=builder /app/tsconfig.json ./

EXPOSE 3000

CMD ["bun", "dist/src/main.js"]
