##### Languages: [Portuguese](), [English]()

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

## 3. Instalation
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
SECRET_KEY = Secret Key to protect the application through the JWT
URL_SWAGGER = Swagger UI URL, by default, for local development: localhost:4000
```

## 4. Execução
### Caso não esteja usando o Docker:
1. Após os pré requisitos instalados, execute o MongoDB pelo seu terminal de preferência:
```shell
mongod
```

2. Após o mongo está rodando, execute o comando para executar a aplicação:
```shell
npm start
```
3. Depois abra seu browser em:
```shell
http://localhost:4000
```

### Caso esteja usando Docker:
1. Execute o seguinte comando, apenas uma vez, para contuir a imagem. Caso seja necessário execute-o mais de uma vez.
```shell
npm run docker:dev:build
```
2. Após a imagem ser gerada, execute o comando a seguir para rodar a aplicação:
```
npm run docker:dev
```

## 5. Estrutura do projeto

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
### Descrição:
|Pasta|Descrição|
|-----|------|
📁src |  Código fonte da aplicação
📁config | Onde contém toda a configuração da aplicação
📁config > 📁database | Configurações do Banco de Dados
📁config > 📁server | Configurações do Servidor
📁config > 📁tests | Configurações dos Testes
📁controllers | Pasta onde se encontra a lógica da aplicação
📁middlewares | Onde está todos os middlewares, incluindo a autenticação, não sabe o que é middleware, [veja aqui](https://www.redhat.com/pt-br/topics/middleware/what-is-middleware)  
📁docs | Documentação das rotas da api, para editá-la use o [Swagger Editor](https://editor.swagger.io/)
📁auth | Autenticação do sistema
📁auth > 📁tests | Testes relativos à autenticação
📁models| Modelo das tabelas que serão geradas no MongoDB
📁routes | Definição das rotas
📁tests | Testes gerais da aplicação
📁lang | Pasta com traduções do README

### Rotas
#### Lista das Rotas:

##### Autenticação
|Verbo | Caminho|Descrição |
|------|--------|----------|
|POST | /api/auth/login|Autentica o Usuário e retorna um Token|

##### Usuário
|Verbo | Caminho|Descrição |Observações|
|------|--------|----------|-----------|
|POST | /api/user|Cadastra um Usuário|
|GET | /api/user|Retorna o Usuário que está autenticado|Usuário precisa estar autenticado|
|PUT | /api/user|Edita o Usuário que está autenticado|Usuário precisa estar autenticado|
|DELETE | /api/user|Retorna o Usuário que está autenticado|Usuário precisa estar autenticado|

##### Autor
|Verbo | Caminho|Descrição |
|------|--------|----------|
|POST | /api/authors| Cadastra um Autor|
|GET | /api/authors| Retorna todos os Autores|
|GET | /api/authors?limit&offset | Retorna todos os Autores segundo a busca pelos parâmetros da query|
|GET | /api/authors/:id| Retorna o Autor de acordo com o ID passado como parâmetro| 
|PUT | /api/authors/:id|Edita o Autor de acordo com o ID passado como parâmetro| 
|DELETE | /api/authors/:id|Remove o Autor de acordo com o ID passado como parâmetro| 

##### Artigo
|Verbo | Caminho|Descrição |
|------|--------|----------|
|POST | /api/articles| Cadastra um Artigo|
|GET | /api/articles| Retorna todos os Artigos|
|GET | /api/articles?offset&limit|Retorna todos os Artigos segundo a busca pelos parâmetros da query|
|GET | /api/articles/:permalink|Retorna o Autor de acordo com o permalink passado como parâmetro| 
|PUT | /api/articles/:permalink|Edita o Autor de acordo com o permalink passado como parâmetro| 
|DELETE | /api/articles/:permalink|Remove o Autor de acordo com o permalink passado como parâmetro| 

##### Comentários
|Verbo | Caminho|Descrição |Observações|
|------|--------|----------|-----------|
|POST | /comments/:permalink|Cadastra um Comentário|Usuário precisa estar autenticado|
|GET | /comments/:permalink|Retorna todos os Comentários de um Artigo|Usuário precisa estar autenticado|
|GET | /comments/:permalink?offset&limit|Retorna todos os Comentários de um Artigo segundo a busca pelos parâmetros da query|Usuário precisa estar autenticado|
|PUT | /comments/:commentId/:permalink|Edita um Comentário de um Artigo|Usuário precisa estar autenticado|
|DELETE | /comments/:commentId/:permalink|Remove um Comentário de um Artigo|Usuário precisa estar autenticado|


##### Veja toda a documentação sobre as rotas aqui:

Após sua aplicação estiver rodando vá em http://localhost:4000 

## 6. Deploy
Use estes scripts para gerar uma pasta pronta para produção e implantação do blog.

>Comando que irá gerar uma pasta com o nome build/, lá conterá todo código do >blog pronto para que seja implantado em um servidor.
>```shell
>npm run build
>```
 
 >Apaga a pasta src/
 >```shell
 >npm run cleanSrc
 >```

 >Roda o servidor detro da pasta build/
 >```shell
 > npm run prod
 >```