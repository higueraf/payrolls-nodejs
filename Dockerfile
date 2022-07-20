FROM node:14
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
RUN npm install -g nodemon

WORKDIR /payrolls-nodejs

COPY . .

RUN npm install

CMD ["npm", "start"]

EXPOSE 3000