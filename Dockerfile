FROM node:alpine

WORKDIR /server

COPY . /server

RUN npm install

CMD [ "npm", "run", "docker" ]

