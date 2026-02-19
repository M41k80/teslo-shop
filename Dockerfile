# ==========================
# STAGE 1: BUILD
# ==========================
FROM node:22-slim AS builder


WORKDIR /app

# Copiamos manifests
COPY package.json yarn.lock ./

# Instalamos dependencias
RUN yarn install --frozen-lockfile

# Copiamos el resto del código
COPY . .

# Build
RUN yarn build


# ==========================
# STAGE 2: RUNTIME
# ==========================
FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV NODE_OPTIONS=--max-old-space-size=512

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./

EXPOSE 3000

CMD ["node", "dist/main.js"]