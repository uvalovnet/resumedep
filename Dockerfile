FROM node:22-bookworm-slim AS build
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY prisma ./prisma
RUN npm run prisma:generate
COPY tsconfig*.json ./
COPY src ./src
COPY test ./test
COPY docker ./docker
RUN npm run build && npm run typecheck

FROM build AS test
ENTRYPOINT ["sh", "docker/entrypoint.sh"]
CMD ["npm", "test"]

FROM node:22-bookworm-slim AS runtime
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /app
ENV NODE_ENV=production PORT=3000
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist ./dist
COPY --from=build --chown=node:node /app/prisma ./prisma
COPY --from=build --chown=node:node /app/docker ./docker
COPY --from=build --chown=node:node /app/package*.json ./
USER node
EXPOSE 3000
ENTRYPOINT ["sh", "docker/entrypoint.sh"]
CMD ["node", "dist/src/main.js"]
