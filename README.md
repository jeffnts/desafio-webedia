# Instruções
<hr />

## Descrição
API que consiste no back-end de um blog, feita utilizando o modelo arquitetural REST, como parte do processo de seleção da [web**edia**](http://www.webedia.com.br/).



## Pré requisitos
### Caso não use Docker:
- Café ☕️
- [NodeJs](https://nodejs.org/en/) - Versão 10, ou superior
- [MongoDB](https://www.mongodb.com/download-center/community)
- [Redis](https://redis.io/download)

### Caso use Docker:
- Café ☕️
- [NodeJs](https://nodejs.org/en/) - Versão 10, ou superior
- [Docker](https://www.docker.com/products/docker-desktop)

### Sente-se confortável, pegue sua xícara de café e vamos nessa!

## Instalação
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

## Execução
### Caso não esteja usando o Docker:
1. Após os pré requisitos instalados, execute o MongoDB pelo seu terminal de preferência:
```shell
mongod
```

2. Após o mongo está rodando, execute o comando para executar a aplicação:
```shell
npm run dev
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

## Estrutura do projeto


>- 📂src  
>   - 📁config
>       - 📁database
>       - 📁server
>       - 📁tests
>   - 📁controllers
>   - 📁middlewares
>       - 📂auth
>           - 📁tests
>   - 📁models
>   - 📁routes
>   - 📁tests 

### Descrição:
|Pasta|Descrição|
|-----|------|
📁src |  Código fonte da aplicação
📁config | Onde contém toda a configuração da aplicação
📁config > 📁database | Configurações do Banco de Dados
📁config > 📁server | Configurações do Servidor
📁config > 📁tests | Configurações do testes
📁controllers | Pasta onde se encontra a lógica da aplicação
📁middlewares | Onde está todos os middlewares, incluindo a autenticação, não sabe o que é middleware, [veja aqui](https://www.redhat.com/pt-br/topics/middleware/what-is-middleware)  
📁auth | Autenticação do sistema
📁auth > 📁tests | Testes relativos à autenticação
📁models| Modelo das tabelas que serão geradas no MongoDB
📁routes | Definição das rotas
📁tests | Testes gerais da aplicação

### Rotas
#### Veja toda a documentação sobre as rotas da aplicação aqui: 

 