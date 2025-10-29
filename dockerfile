FROM node:22

# install git to run rev-parse
RUN apt-get update && apt-get install -y git chromium ffmpeg
RUN which chromium

WORKDIR /usr/src/app
COPY . .

# build application
RUN cd site; npm ci
RUN cd site/server ; npm ci ; cd ..
RUN cd site/page ; npm ci ; cd ..
RUN cd site; npm run build

WORKDIR /usr/src/app/site/server
CMD [ "node", ".built/index.js" ]
