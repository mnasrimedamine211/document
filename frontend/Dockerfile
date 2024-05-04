# Step 1: Build the application
FROM node:16-alpine as build-step

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Use nginx to serve the application
FROM nginx:1.21-alpine
COPY --from=build-step /app/dist/frontend /usr/share/nginx/html
