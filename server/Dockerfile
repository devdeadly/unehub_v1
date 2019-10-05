FROM node:latest
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm install && npm install -g nodemon
# The <dest> in COPY is an absolute path, or a path relative to WORKDIR - we want the latter
COPY ./ ./
EXPOSE 8000
ENV NODE_ENV development
# CMD ["npm", "start"] # I don't understand what this is for if we run nodemon server in the docker-compose