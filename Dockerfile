# Use the official Node.js image from the Docker Hub
FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g nodemon

COPY . .

EXPOSE 8000

CMD ["npm", "run", "dev"]
