# ─── Builder Stage ────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

# Native addon build tools (better-sqlite3 için)
RUN apk add --no-cache libc6-compat python3 make g++

WORKDIR /app

# Dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Source
COPY . .

# Build
RUN npm run build

# ─── Runner Stage ─────────────────────────────────────────────────────────────
FROM node:20-alpine AS runner

RUN apk add --no-cache libc6-compat

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Uploads klasörü
RUN mkdir -p /app/public/uploads

# Tüm dosyaları kopyala (standalone değil, tam kurulum)
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts

EXPOSE 3000

CMD ["node_modules/.bin/next", "start"]
