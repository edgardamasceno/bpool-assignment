FROM node:14.15.0-alpine3.10 as builder

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
RUN apk add --no-cache python make g++;

COPY src/front-end/package.json /app/package.json
COPY src/front-end/yarn.lock /app/yarn.lock

RUN yarn global add react-scripts@4.0.1
RUN yarn install;

EXPOSE 3000

CMD ["yarn", "start"]
