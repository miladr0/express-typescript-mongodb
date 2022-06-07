# build stage
FROM node:16.14.0-alpine as build-stage

COPY . ./app

WORKDIR /app

RUN npm install

RUN npm install -g yarn


EXPOSE 3001

# dev
FROM build-stage as dev-build-stage

ENV NODE_ENV development

CMD ["yarn", "dev"]

# Production
FROM build-stage as prod-build-stage

ENV NODE_ENV production

CMD ["run", "start"]
