FROM node:15.3.0-alpine3.10 as builder

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
RUN apk add --no-cache python make g++;

COPY src/front-end/package.json /app/package.json

RUN yarn install;

EXPOSE 3000

CMD ["yarn", "start"]
