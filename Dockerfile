FROM node:14

WORKDIR /usr/src/app

RUN npm install

COPY package.json ./

COPY . .
EXPOSE 8080

CMD ["npm", "run", "start-express"]