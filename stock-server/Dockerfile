FROM node:11.13.0-alpine
MAINTAINER jon-m



# Install dependencies
COPY package*.json ./
RUN apk add --no-cache make gcc g++ python && \
  npm install --production --silent && \
  apk del make gcc g++ python

# Setup directory structure
RUN mkdir /node-app
WORKDIR /node-app
COPY ./ /node-app
