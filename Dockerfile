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

# Step 2: Serve the built app with Nginx and SSL support
FROM nginx:alpine

# Copy the built React app from the previous stage to the Nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy the SSL certificates to the container
# Replace with your actual certificate paths
COPY path/to/fullchain.pem /etc/nginx/ssl/fullchain.pem
COPY path/to/privkey.pem /etc/nginx/ssl/privkey.pem

# Copy a custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTPS port 443
EXPOSE 443

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
