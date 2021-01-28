FROM dockerreg.rbb-cloud.de/rbb/alpine:3.10 as builder

# install build tools so we can buil local npm packages
# RUN apk add --no-cache --update make gcc g++ python nodejs-current npm
RUN apk add --update --no-cache gcc g++ make python nodejs-current npm
# create app directory
WORKDIR /app

# copy package.json, package-lock.json and install app dependencies
COPY package*.json /app/
RUN npm ci
RUN node_modules/next/dist/bin/next telemetry disable

# bundle app
COPY . /app/
RUN npm run build

# reinstall so only modules needed for production are moved to final container
# npm ci will remove the node_modules folder before runnning
RUN npm ci --production

# ----------------------------------
FROM dockerreg.rbb-cloud.de/rbb/alpine:3.10 as rbb-data-starter
# install nodejs
RUN apk add --no-cache --update nodejs-current

RUN addgroup node -g 11000 -S && adduser node -u 11000 -S -G node

WORKDIR /app
COPY --from=builder --chown=node:node /app /app/

RUN node_modules/next/dist/bin/next telemetry disable

USER node

EXPOSE 3000
ENTRYPOINT [ "node_modules/next/dist/bin/next" ]
CMD [ "start" ]