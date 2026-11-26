FROM node:latest

WORKDIR /app

COPY . .

RUN npm install

ENV NODE_ENV=development

EXPOSE 3000

CMD ["node", "server.js"]
