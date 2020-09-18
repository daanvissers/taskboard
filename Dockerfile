# Build stage

FROM node:12 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Serving stage

FROM nginx:1.19.2

COPY --from=build /app/dist/taskboard/ /usr/share/nginx/html