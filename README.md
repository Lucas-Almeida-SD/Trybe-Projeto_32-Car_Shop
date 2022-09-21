# Projeto Car Shop

Esse projeto foi realizado para exercitar o que foi aprendido no Bloco 30 do Módulo de Back End do curso da [Trybe](https://www.betrybe.com/), no qual foi sobre `MongoDB` com `Node.js` e `POO`.

Nesse projeto foi desenvolvida uma `REST API`, através do `Node.js`, `Express`, `Mongoose` e `TypeScript`, utilizando arquitetura de software `MSC`, `POO` e `SOLID`, tendo como sistema de gerenciamento de banco de dados o `MongoDB`.

A API é um sistema de gerenciamento de veículos de uma concessionária, no qual é possível realizar operações de CRUD(create, read, update, delete).

Para verificar a funcionalidade da API, foram desenvolvidos testes unitários com as ferramentas `Mocha`, `Chai` e `Sinon`.

Para desenvolver a documentação da API foi utilizado a ferramenta `Swagger`.

## Tecnologias

  - Node.js
  - Express
  - TypeScript
  - MongoDB
  - Mongoose
  - Zod
  - Swagger
  - Mocha
  - Chai
  - Sinon
  - Docker

## Como executar

Clone o projeto e acesse a pasta do mesmo.

```bash
$ git clone git@github.com:Lucas-Almeida-SD/Trybe-Projeto_32-Car_Shop.git

$ cd Trybe-Projeto_32-Car_Shop
```

Para iniciá-lo, siga os passos abaixo:

<details>
  <summary><strong>Com Docker</strong></summary>

  ```bash
  # Criar container
  $ docker-compose up -d

  # Abrir terminal interativo do container
  $ docker exec -it car_shop bash

  # Instalar as dependências
  $ npm install

  # Iniciar o projeto
  $ npm start
  ```

  Para executar os testes, utilize o terminal interativo do container e insira o comando abaixo: 

  ```bash
  $ npm run test:dev
  ```
</details>

<details>
  <summary><strong>Sem Docker</strong></summary>

  ```bash
  # Instalar as dependências
  $ npm install

  # Iniciar o projeto
  $ npm start
  ```

  Para executar os testes, utilize o terminal e insira o comando abaixo: 

  ```bash
  $ npm run test:dev
  ```
</details>

Lembrando que o arquivo `.env.example` deverá ser renomeado para `.env` e a variável de ambiente contida nele deverá possuir uma `URI` válida.

A API será executada na porta `3001` e sua documentação estará disponível em [http://localhost:3001/docs/](http://localhost:3001/docs/).