FROM node:10.14.2-alpine

WORKDIR /usr/api

COPY package*json ./
RUN npm install --quiet

COPY . .
RUN npm run build
RUN npm run cleanSrc

#Commented because expose is not supported by heroku
#EXPOSE 4000

CMD ["npm", "run", "prod"]