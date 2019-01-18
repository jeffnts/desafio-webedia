# Instruções
<hr />

##Conteúdo
1. [Descrição](#Descrição)
2. [Pré requisitos](#pré-requisitos)
3. [Instalação](#Instalação)
4. [Execução](#Execução)
5. [Estrutura do projeto](#Estrutura-do-projeto)

## 1. Descrição
API que consiste no back-end de um blog, feita utilizando o modelo arquitetural REST, como parte do processo de seleção da [web**edia**](http://www.webedia.com.br/).



## 2. Pré requisitos
### Caso não use Docker:
- Café ☕️
- [Git](https://git-scm.com/downloads)
- [NodeJs](https://nodejs.org/en/) - Versão 10+
- [MongoDB](https://www.mongodb.com/download-center/community)
- [Redis](https://redis.io/download)

### Caso use Docker:
- Café ☕️
- [Git](https://git-scm.com/downloads)
- [NodeJs](https://nodejs.org/en/) - Versão 10+
- [Docker](https://www.docker.com/products/docker-desktop)

### Sente-se confortável, pegue sua xícara de café e vamos nessa!

## 3. Instalação
1. Clone o projeto para sua máquina local:
```shell
git clone https://github.com/jeffnts/desafio-webedia.git
```

2. Entre na pasta do projeto:
```shell
cd desafio-webedia
```

3. Instale as dependências através do comando:
```shell
npm install
```
4. Defina as Variáveis de Ambiente:
Junto com o projeto, na raiz do mesmo, já se encontra um arquivo ***.env*** com essas variáveis definidas.
```
URL_DB_DEVELOPMENT = URL de conexão do MongoDB (Desenvolvimento)
URL_DB_TESTS = URL de conexão do MongoDB (Testes)
SECRET_KEY = Chave Secreta para proteger a Autenticação
URL_SWAGGER = URL do Swagger UI, por padrão para desenvolvimento local: localhost:4000
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
|POST | /api/author| Cadastra um Autor|
|GET | /api/author| Retorna todos os Autores|
|GET | /api/author?limit&offset | Retorna todos os Autores segundo a busca pelos parâmetros da query|
|GET | /api/author/:id| Retorna o Autor de acordo com o ID passado como parâmetro| 
|PUT | /api/author/:id|Edita o Autor de acordo com o ID passado como parâmetro| 
|DELETE | /api/author/:id|Remove o Autor de acordo com o ID passado como parâmetro| 

##### Artigo
|Verbo | Caminho|Descrição |
|------|--------|----------|
|POST | /api/article| Cadastra um Artigo|
|GET | /api/article| Retorna todos os Artigos|
|GET | /api/article?offset&limit|Retorna todos os Artigos segundo a busca pelos parâmetros da query|
|GET | /api/article/:permalink|Retorna o Autor de acordo com o permalink passado como parâmetro| 
|PUT | /api/article/:permalink|Edita o Autor de acordo com o permalink passado como parâmetro| 
|DELETE | /api/article/:permalink|Remove o Autor de acordo com o permalink passado como parâmetro| 

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


 