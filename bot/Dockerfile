FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Dependancies
COPY package*.json ./
RUN npm install

COPY . .

CMD [ "npm", "start" ]