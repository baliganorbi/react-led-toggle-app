# Stage 1: Use an official Node.js runtime as a parent image for the build stage
FROM node:lts-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build


# Stage 2: Use an official Nginx image to serve the build files
FROM nginx:stable-alpine AS serve

# Copy the build files from the build stage to the Nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the host
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
