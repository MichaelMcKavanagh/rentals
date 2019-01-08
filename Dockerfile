FROM node:8

WORKDIR /src
ADD package.json .
RUN yarn install

ADD . .
