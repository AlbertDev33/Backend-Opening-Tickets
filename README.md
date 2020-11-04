# Sistama de abertura de tickets

### Bibliotecas e recursos utilizados no projeto

- express - Frameword para configuração do servidor
- typeorm - ORM utilizado para gerar as query para o banco de dados
- pg - Plugin para utilizar o postgreSQL
- bcrypt - Biblioteca utilizada para gerar o hash da senha do usuário
- jsonwebtoken - Biblioteca utilizada para gerar o token do usuário
- reflect-metadata - Biblioteca para utilização de decorators do typeorm.
- eslint - Padronização do código.
- prettier - Padronização do código.
- editorconfig - Padronização do código.
- ts-node-dev - Biblioteca que permite rodar o servidor de forma mais simples com o typescript.
- tsconfig-paths - Biblioteca utilizada para gerar os caminhos das pastas com @ e facilitar a leitura.

## Estrutura de pastas do projeto

```
├── yarn.lock
├── yarn-error.log
├── tsconfig.json
├── src
│   ├── shared
│   │   ├── infra
│   │   │   ├── typeorm
│   │   │   │   ├── migrations
│   │   │   │   │   ├── 1603119706839-CreateTickets.ts
│   │   │   │   │   └── 1603119695857-CreateUsers.ts
│   │   │   │   └── index.ts
│   │   │   └── http
│   │   │       ├── server.ts
│   │   │       └── routes
│   │   │           └── index.ts
│   │   └── errors
│   │       └── AppError.ts
│   ├── modules
│   │   ├── users
│   │   │   ├── services
│   │   │   │   ├── SessionsUserService.ts
│   │   │   │   ├── FindUserService.ts
│   │   │   │   └── CreateUserService.ts
│   │   │   ├── repositories
│   │   │   │   └── IUsersRepository.ts
│   │   │   ├── infra
│   │   │   │   ├── typeorm
│   │   │   │   │   ├── repositories
│   │   │   │   │   │   └── UsersRepository.ts
│   │   │   │   │   └── entities
│   │   │   │   │       └── User.ts
│   │   │   │   └── http
│   │   │   │       ├── routes
│   │   │   │       │   ├── users.routes.ts
│   │   │   │       │   └── sessions.routes.ts
│   │   │   │       └── middlewares
│   │   │   │           └── confirmAuthenticated.ts
│   │   │   └── dtos
│   │   │       └── ICreateUserDTO.ts
│   │   └── tickets
│   │       ├── services
│   │       │   ├── UpdateTicketMessageService.ts
│   │       │   ├── ListTicketService.ts
│   │       │   ├── ListAllTicketsService.ts
│   │       │   ├── DeleteTicketService.ts
│   │       │   └── CreateTicketService.ts
│   │       ├── repositories
│   │       │   └── ITicketsRepository.ts
│   │       ├── infra
│   │       │   ├── typeorm
│   │       │   │   ├── repositories
│   │       │   │   │   └── TicketsRepository.ts
│   │       │   │   └── entities
│   │       │   │       └── Ticket.ts
│   │       │   └── http
│   │       │       └── routes
│   │       │           └── tickets.routes.ts
│   │       └── dtos
│   │           └── ICreateTicketDTO.ts
│   ├── config
│   │   └── auth.ts
│   └── @types
│       └── express.d.ts
├── prettier.config.js
├── package.json
├── ormconfig.json
└── README.md
```

### Funcionalidades desenvolvidas

- Criar sessão do usuário
- Update da mensagem do ticket
- Encerrar um tiket
- Buscar todos os tickets por usuário
- Criar tickets
- Buscar usuário por id
- Criar um usuário

### Alguns exemplos dessa API

#### Criar uma sessão para um usuário

```json
{
  "user": {
    "id": "f4910ed4-2537-4968-a69f-ee0fd026dba8",
    "name": "Example User",
    "email": "User@user.com",
    "created_at": "2020-11-03T18:42:50.427Z",
    "updated_at": "2020-11-03T18:42:50.427Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDQ0MTgxODUsImV4cCI6MTYwNDQ0Njk4NSwic3ViIjoiZjQ5MTBlZDQtMjUzNy00OTY4LWE2OWYtZWUwZmQwMjZkYmE4In0.pp5vtCRzmkSw1B9DpLF0-Uch53mXwlicuS88v1o4HQw"
}
```

#### Buscar ticket por usuário

```json
[
  {
    "id": "e6fad581-43c8-478a-b3ff-bd8a7701082d",
    "subject": "Cadastro de tickets",
    "message": "Realizando cadastro de tickets",
    "user_id": "c6bcff98-d66a-4b63-b89a-c68bedd653c2",
    "created_at": "2020-11-03T17:13:59.667Z",
    "updated_at": "2020-11-03T17:13:59.667Z"
  },
  {
    "id": "3887b607-10be-44c1-bf9b-f1be23dbacc1",
    "subject": "Segundo teste de cadastro de tickets",
    "message": "Esse é o segundo cadastro de tickets",
    "user_id": "c6bcff98-d66a-4b63-b89a-c68bedd653c2",
    "created_at": "2020-11-03T17:15:35.547Z",
    "updated_at": "2020-11-03T17:15:35.547Z"
  }
]

```

#### Criar um usuário

```json
{
  "name": "Example User",
  "email": "User@user.com",
  "id": "f4910ed4-2537-4968-a69f-ee0fd026dba8",
  "created_at": "2020-11-03T18:42:50.427Z",
  "updated_at": "2020-11-03T18:42:50.427Z"
}
```

### Como executar o projeto

- Clone o projeto
- Execute o comando yarn ou npm install (esse projeto foi desenvolvido com yarn)
- Crie uma chave secreta para que o token gerado seja validado e insira em uma
variável ambiente
- Substitua as credenciais de acesso ao banco de dados no arquivo ormconfig.json
- Coloque seu banco de dados em funcionamento para que a API possa se conectar
a ela.
- Rode o comando yarn dev:server ou altere o script no pakage.json;

