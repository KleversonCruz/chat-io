FROM node:19-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY src/ ./src/
COPY public/ ./public
COPY rooms.json ./

EXPOSE 3000

CMD ["npm", "start"]
