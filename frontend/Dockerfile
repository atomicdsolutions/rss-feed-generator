# Build stage
FROM node:20 as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Clear npm cache and install dependencies
RUN npm cache clean --force && \
    npm install --legacy-peer-deps && \
    npm install -g @angular/cli@17.3.0

# Copy project files
COPY . .

# Generate Tailwind CSS
RUN npx tailwindcss init

# Build the application (using proper production flag)
RUN npm run build -- --configuration production

# Production stage
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/dist/peas-rss-frontend/browser /usr/share/nginx/html/

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80