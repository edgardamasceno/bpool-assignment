FROM node:14.15.0-alpine3.10

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
RUN apk add --no-cache python make g++;

COPY src/back-end/package.json /app/package.json

RUN yarn global add @nestjs/cli;
RUN yarn install;

EXPOSE 4000
CMD ["npm", "run", "start:dev"]
