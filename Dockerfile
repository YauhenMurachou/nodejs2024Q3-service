FROM node:alpine

LABEL version='2.0'
LABEL name='Y.mrc'

WORKDIR /app

COPY package*.json ./
COPY ./.env ./
COPY tsconfig*.json ./
COPY ./dist ./dist

RUN npm install

EXPOSE 4000

CMD [ "npm", "run", "start:dev" ]