# Build stage
FROM node:20.14.0-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm i

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host"]

