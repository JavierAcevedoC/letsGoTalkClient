# Etapa 1: Build
FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration production

# Etapa 2: Servidor Nginx
FROM nginx:alpine
COPY --from=builder /app/dist/tu-nombre-app /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
