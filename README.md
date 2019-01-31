##### Idiomas: [Português](https://github.com/jeffnts/desafio-webedia/tree/master/lang/portuguese), [Inglês](https://github.com/jeffnts/desafio-webedia)

# Instructions
<hr />
<!-- 
## Conteúdo
1. [Descrição](#descricao)
2. [Pré requisitos](#pre-requisitos)
3. [Instalação](#instalacao)
4. [Execução](#execução)
5. [Estrutura do projeto](#estrutura-do-projeto)
6. [Deploy](#deploy) -->

## 1. Description 
API that consist in a blog back-end based on the REST architecture as the part of selection process of the [web**edia**](http://www.webedia.com.br/).



## 2. Requirements
### In case you don't use Docker:
- Coffee ☕️
- [Git](https://git-scm.com/downloads)
- [NodeJs](https://nodejs.org/en/) - Version 10+
- [MongoDB](https://www.mongodb.com/download-center/community)
- [Redis](https://redis.io/download)

### In case you use Docker:
- Coffee ☕️
- [Git](https://git-scm.com/downloads)
- [NodeJs](https://nodejs.org/en/) - Version 10+
- [Docker](https://www.docker.com/products/docker-desktop)

### Sit down, relax, get you coffee and here we go!

## 3. Installation
1. Clone the project to your computer:
```shell 
git clone https://github.com/jeffnts/desafio-webedia.git
```

2. Enter in the project folder:
```shell
cd desafio-webedia
```

3. Install de dependences by typing the command:
```shell
npm install
```
4. Set the environment variables:
 Within the project is going a file ***.env*** with this variables defined. 
```
URL_DB_PRODUCTION = MongoDB URL connection (Production)
URL_DB_DEVELOPMENT = MongoDB URL connection (Development)
URL_DB_TESTS = MongoDB URL connection (Tests)
REDIS_HOTS = By default,localhost if you are not using docker, or redis if you are using docker
SECRET_KEY = Secret Key to protect the application through the JWT
URL_SWAGGER = Swagger UI URL, by default, for local development: localhost:4000
```

## 4. Execution
### In case you are using Docker:
1. After the requirements have been installed, execute the MongoDB using this command within your favorite terminal:
```shell
mongod
```

2. After the MongoDB will be running, execute the following command to start the application:
```shell
npm start
```
3. Then open your browser in:
```shell
http://localhost:4000
```

### In case you are using  Docker:
1. Execute this command once to build the Docker Image, if you needed do it more that once.
```shell
npm run docker:dev:build
```
2. After the image will be builded, execute the following command to start the application.
```
npm run docker:dev
```
3. Then open your browser in:
```shell
http://localhost:4000
```

## 5. Project Structure

```
- 📂src  
   - 📁config
       - 📁database
       - 📁server
       - 📁tests
   - 📁controllers
   - 📁docs
   - 📁middlewares
       - 📂auth
           - 📁tests
   - 📁models
   - 📁routes
   - 📁tests 
- 📁lang 
```
### Description:
|Folder|Description|
|-----|------|
📁src |  Application source code
📁config | Where the application settings lays
📁config > 📁database | Database Settings
📁config > 📁server | Server Settings
📁config > 📁tests | Tests Settings
📁controllers | The place where the application logic are inside
📁middlewares | Where the middlewares are inside, including the authentication, don't know what middleware is? [See here](https://www.redhat.com/en/topics/middleware/what-is-middleware)  
📁docs | Routes API documentation, to edit them use the [Swagger Editor](https://editor.swagger.io/)
📁auth | Application Authentication
📁auth > 📁tests | Tests related to the authentication
📁models| Tables models to be generated by the MongoDB
📁routes | Routes definitions
📁tests | Application Tests
📁lang | Folder with the README Translations

### Routes
#### Routes List:

##### Authentication
|Verb | Path|Description |
|------|--------|----------|
|POST | /api/auth/login|Authenticate the user and return a Token|

##### Usuário
|Verb | Path|Description |Observations|
|------|--------|----------|-----------|
|POST | /api/user|Register a User|
|GET | /api/user|Return the authenticated User|The User must be authenticated|
|PUT | /api/user|Edit the authenticated User|The User must be authenticated|
|DELETE | /api/user|delete the authenticated User|The User must be authenticated|

##### Autor
|Verbo | Caminho|Descrição |
|------|--------|----------|
|POST | /api/authors| Register an Author|
|GET | /api/authors| Return all Authors|
|GET | /api/authors?limit&offset | Return all Authors according the searching by the query parameters|
|GET | /api/authors/:id| Return the author according the ID passed as parameter| 
|PUT | /api/authors/:id|Edit the author according the ID passed as parameter| 
|DELETE | /api/authors/:id|Remove the author according the ID passed as parameter| 

##### Artigo
|Verbo | Caminho|Descrição |
|------|--------|----------|
|POST | /api/articles| Register an Article|
|GET | /api/articles| Return all Articles|
|GET | /api/articles?offset&limit|Return all Articles according the searching by the query parameters|
|GET | /api/articles/:permalink|Return the Article according the permalink passed as parameter| 
|PUT | /api/articles/:permalink|Edit the Article according the permalink passed as parameter| 
|DELETE | /api/articles/:permalink|Remove the Article according the permalink passed as parameter| 

##### Comentários
|Verbo | Caminho|Descrição |Observações|
|------|--------|----------|-----------|
|POST | /comments/:permalink|Register a Comment inside an Article|The User must be authenticated|
|GET | /comments/:permalink|Return all Articles Comments|The User must be authenticated|
|GET | /comments/:permalink?offset&limit|Return all Articles Comments according the searching by the query parameters|The User must be authenticated|
|PUT | /comments/:commentId/:permalink|Edit an Article Comment|The User must be authenticated|
|DELETE | /comments/:commentId/:permalink|Remove an Article Comment|The User must be authenticated|


##### See all about the routes documentation:

After the application is running go to http://localhost:4000 

## 6. Deploy
Use these scripts to generate the folder ready to deploy the blog.

>These command will generate a folder with the name /build where will be all the blog code ready to deploy to a server.
>```shell
>npm run build
>```
 
 >Remove the src/ folder
 >```shell
 >npm run cleanSrc
 >```

 >Run the server inside the build/ folder
 >```shell
 > npm run prod
 >```