# Build Angular app
FROM node:20 as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build -- --configuration production

# Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist/ /usr/share/nginx/html
