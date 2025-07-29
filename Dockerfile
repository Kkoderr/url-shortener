FROM node:20-alpine

WORKDIR /home/app

COPY package.json ./

RUN npm i

COPY . .

EXPOSE 3001

CMD ["node","app.js"]