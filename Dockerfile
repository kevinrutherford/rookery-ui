FROM node:20.2.0-alpine3.18 as base

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
FROM base as deps
WORKDIR /app
COPY package*.json ./
RUN npm install

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
FROM deps AS builder
WORKDIR /app
COPY . .
ENV NODE_ENV=production
RUN node node_modules/.bin/remix build

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
FROM deps AS prod-deps
WORKDIR /app
RUN npm install --production

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
FROM base as runner
RUN addgroup --system --gid 17001 remix
RUN adduser --system --uid 17001 remix
USER remix

WORKDIR /app
COPY --from=prod-deps --chown=remix:remix /app/package*.json ./
COPY --from=prod-deps --chown=remix:remix /app/node_modules ./node_modules
COPY --from=builder --chown=remix:remix /app/build ./build
COPY --from=builder --chown=remix:remix /app/public ./public

ENV NODE_ENV=production
ENTRYPOINT [ "node", "node_modules/.bin/remix-serve", "build/index.js"]

