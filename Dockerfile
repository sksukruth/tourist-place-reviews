FROM node
WORKDIR /touristplaces/frontend
COPY frontend/package*.json ./
RUN npm i
COPY frontend/ .
EXPOSE 3000

WORKDIR /touristplaces/backend
COPY backend/ .
EXPOSE 5000

WORKDIR /touristplaces/
COPY package*.json ./
RUN npm i

CMD ["npm","run","dev"]