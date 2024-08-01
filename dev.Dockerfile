FROM node:22-alpine as base

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
FROM base as deps
WORKDIR /app
COPY package.json package-lock.json \
  public/ remix.config.js remix.env.d.ts tailwind.config.ts \
  tsconfig.json \
  ./

RUN npm install

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
FROM deps as runner

WORKDIR /app

EXPOSE 3000
EXPOSE 3001
ENTRYPOINT [ "node", "node_modules/.bin/remix", "dev"]

