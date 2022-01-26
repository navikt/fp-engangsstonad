FROM node:17.4-slim

WORKDIR /usr/src/app

RUN npm install

COPY package.json ./

COPY . .
EXPOSE 8080

CMD ["npm", "run", "start-express"]