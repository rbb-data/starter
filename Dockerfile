FROM dockerreg.rbb-cloud.de/rbb/alpine:3.10 as builder

# install build tools so we can buil local npm packages
RUN apk add --no-cache --update make gcc g++ python nodejs-current npm
# create app directory
WORKDIR /app

# copy package.json, package-lock.json and install app dependencies
COPY package*.json /app/
RUN npm ci

# dissable nextjs tracking 
RUN node_modules/next/dist/bin/next telemetry disable

# bundle app
COPY . /app/
RUN npm run build

# reinstall so only modules needed for production are moved to final container
# npm ci will remove the node_modules folder before runnning
RUN npm ci --production

# ----------------------------------
FROM dockerreg.rbb-cloud.de/rbb/alpine:3.10
# install nodejs
RUN apk add --no-cache --update nodejs-current

# don't run as root
RUN addgroup -S node && adduser -S node -G node
USER node

WORKDIR /app
COPY --from=builder --chown=node:node /app /app/

# dissable nextjs tracking 
RUN node_modules/next/dist/bin/next telemetry disable

EXPOSE 3000
CMD [ "node_modules/next/dist/bin/next", "start" ]