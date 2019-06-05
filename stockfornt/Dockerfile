# Stage 0, base build stage
FROM node:8-alpine as build-stage

RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./


ARG env=""

RUN npm run build -- --output-path=./dist/out -c $env

# Stage 1, add nginx
FROM nginx:stable-alpine as final-stage

# copy the build assets to this layer
COPY --from=build-stage /app/dist/out /usr/share/nginx/html

# Copy default nginx.conf
COPY --from=build-stage /app/.docker/nginx.conf /etc/nginx/conf.d/default.conf



