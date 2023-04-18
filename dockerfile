FROM node:18.12.1
WORKDIR /app/carcassonne-api
COPY package.json ./
RUN yarn
COPY . .
EXPOSE 6666
CMD yarn prod
