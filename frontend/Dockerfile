FROM node:21-alpine as builder

WORKDIR /frontend

COPY package.json ./

RUN npm install

COPY . /frontend

CMD ["npm", "run", "build"]
