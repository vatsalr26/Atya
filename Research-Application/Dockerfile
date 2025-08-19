# Build stage
FROM node:20.14.0-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

RUN npm run prisma:generate

# Build the application
RUN npm run build

# Expose port
#EXPOSE 8888

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=5 \
  CMD node healthcheck.js


EXPOSE 8088
# Start the application
CMD ["node", "dist/src/main.js"] 
