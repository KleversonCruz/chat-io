FROM node:19-alpine

WORKDIR /app

COPY package*.json ./

COPY . /app

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
