FROM krmp-d2hub-idock.9rum.cc/goorm/node:16
WORKDIR /usr/src/app
COPY . .
RUN npm i && npm run build && npm install -g serve
EXPOSE 3000
CMD ["serve", "dist"]
