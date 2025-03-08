FROM node:22-slim AS builder

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci --verbose

COPY . .

RUN npm run deploy

FROM node:22-slim

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json .

CMD ["npm", "start"]
