FROM node:18

WORKDIR /app

RUN git init
RUN git pull https://github.com/jatins/express-hello-world

RUN npm install --force

CMD [ "npm", "start" ]