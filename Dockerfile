FROM node:alpine

WORKDIR /usr/src/app

RUN npm install

COPY package.json ./

COPY . .
EXPOSE 8080

CMD ["npm", "run", "start-express"]
