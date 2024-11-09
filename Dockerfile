# Step 1: Build the React app
FROM node:18-alpine AS build

# Set working directory in the container
WORKDIR /app

# Copy the package.json and yarn.lock files to install dependencies
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application files
COPY . .

# Build the React app
RUN yarn build 

# Step 2: Serve the built app with Nginx (HTTP only)
FROM nginx:alpine

# Copy the built React app from the previous stage to the Nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy a custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
