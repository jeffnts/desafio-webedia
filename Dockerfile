FROM node:10.14.2-alpine

WORKDIR /usr/api

COPY package*json ./
RUN npm install --quiet

COPY . .
RUN npm run build
RUN npm run cleanSrc

#Commented becouse expose is not suported by heroku
EXPOSE 4000

CMD ["npm", "run", "prod"]