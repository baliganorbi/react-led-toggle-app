# Devcontainer Dockerfile
FROM mcr.microsoft.com/devcontainers/javascript-node:20

# Install any additional OS packages you want here
RUN apt-get update && apt-get install -y \
    curl \
    && apt-get clean -y && rm -rf /var/lib/apt/lists/*

# Install project-specific dependencies
WORKDIR /workspace
COPY package*.json ./
RUN npm install

# Set the default command
CMD ["npm", "start"]
