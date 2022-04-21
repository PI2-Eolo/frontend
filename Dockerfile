FROM node:latest

WORKDIR /code

COPY ./package.json ./yarn.lock /code/

RUN yarn

COPY . /code/
