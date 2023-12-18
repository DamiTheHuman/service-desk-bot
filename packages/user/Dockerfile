# Use a Node.js base image
FROM node:20-alpine

# Set the root working directory to app
WORKDIR /app

# Copy the monolithic application
COPY package.json package.json
COPY package-lock.json package-lock.json

# Copy the required packages
COPY packages/user packages/user
COPY packages/shared packages/shared

# Insall all dependencies
RUN npm run install-all

# Set the working directory
WORKDIR /app/packages/user

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]