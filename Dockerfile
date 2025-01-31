# Etapa base: Instalación de dependencias (incluye dev)
FROM node:20-alpine3.20 AS base
WORKDIR /app
COPY package*.json ./
RUN npm install

# Etapa de desarrollo
FROM base AS dev
COPY . .
CMD ["npm", "run", "start:dev"]

# Etapa de construcción
FROM base AS builder
WORKDIR /app
COPY . .
RUN npm run build

# Etapa de producción
FROM node:20-alpine3.20 AS prod
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/src/main"]
