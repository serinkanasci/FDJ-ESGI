FROM node:14-alpine

WORKDIR /usr/src/app

ADD package.json /usr/src/app

RUN npm install -g @vue/cli

RUN chmod -R 755 .
RUN chown -R 1000:1000 .

ADD . /usr/src/app

CMD npm run serve