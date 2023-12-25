FROM --platform=linux/amd64 node:20-alpine AS base
# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app
# Installing dependencies
COPY package*.json ./
RUN npm install
# Copying source files
COPY . .
# Building app
RUN npm run build

EXPOSE 3000

ENV PORT 3000
# Running the app
CMD [ "npm", "start" ]
