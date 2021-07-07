FROM node:10.16-alpine
WORKDIR /react-app
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 3000
CMD ["npm","start"]