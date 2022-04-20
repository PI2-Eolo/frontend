FROM node:alpine

WORKDIR /frontend

COPY package.json ./
COPY node_modules ./
COPY yarn.lock ./
COPY ./ ./

RUN yarn install

CMD ["yarn", "run", "start"]
