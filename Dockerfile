###############################################
# Dockerfile to build a sample web application
###############################################

# Base image is node.js
FROM node:latest

# Author: Moringa School
LABEL maintainer="Moringa School <moringaschool.com>"

# Install redis driver for node.js
RUN npm install redis

# Copy the source code to the Docker image
ADD composeHelper.js /myapp/composeHelper.js
