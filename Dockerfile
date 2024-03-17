# 개발 환경용 Dockerfile

FROM node:20.5.1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

# 개발 환경에서 nodemon을 사용합니다.
CMD ["npm", "run", "start:dev"]