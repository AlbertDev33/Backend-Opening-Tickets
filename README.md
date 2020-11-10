# Sistama de abertura de tickets

## Informações gerais

Essa API foi desenvolvida utilizando Node junto ao Typescript, utilizando TDD e alguns conceitos do SOLID,
como por exemplo:

- Single Responsability Principle;
- Liskov Substitution Principle;
- Dependency Inversion.

## Bancos de Dados utilizados no projeto (com Docker)

PostgreSQL - Esse banco foi utilizado basicamente pela sua robustez
Redis - Banco não relacional. Foi utilizado para armazernar algumas consultas em cache

### Bibliotecas e recursos utilizados no projeto

- express - Frameword para configuração do servidor
- express-async-errors - Tratamento de erros em requisições assíncronas
- Nodemailer - Biblioteca bem conhecida para envio de e-mails com Node.js
- tsyringe - Biblioteca para tratamento de Injeção de Dependência
- handlebars - Ferramenta de template engine. Utilizada nesse projeto para
padronizar templates de envio de e-mail.
- uuidv4 - Biblioteca utilizada para gerar uma sequência de caracteres únicos
- class-transformer - Essa biblioteca foi utilizada nesse projeto para excluir
o password do usuário no retorno das requisições.
- celebrate - Essa biblioteca foi utilizada nesse projeto para validação dos
campos no lado do backend
(nesse projeto foi utilizado para gerar o token de recuperação de senha)
- Jest - Ferramenta utilizada para implementação de testes automatizados
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
├── README.md
├── jest.config.ts
├── ormconfig.example.json
├── ormconfig.json
├── package.json
├── prettier.config.js
├── src
│   ├── @types
│   │   └── express.d.ts
│   ├── config
│   │   ├── auth.ts
│   │   ├── cache.ts
│   │   └── mail.ts
│   ├── modules
│   │   ├── tickets
│   │   │   ├── dtos
│   │   │   │   └── ICreateTicketDTO.ts
│   │   │   ├── infra
│   │   │   │   ├── http
│   │   │   │   │   ├── controllers
│   │   │   │   │   │   ├── ListTicketsController.ts
│   │   │   │   │   │   ├── TicketsController.ts
│   │   │   │   │   │   └── TicketsUpdateController.ts
│   │   │   │   │   └── routes
│   │   │   │   │       └── tickets.routes.ts
│   │   │   │   └── typeorm
│   │   │   │       ├── entities
│   │   │   │       │   └── Ticket.ts
│   │   │   │       └── repositories
│   │   │   │           └── TicketsRepository.ts
│   │   │   ├── repositories
│   │   │   │   └── ITicketsRepository.ts
│   │   │   └── services
│   │   │       ├── CreateTicketService.ts
│   │   │       ├── DeleteTicketService.ts
│   │   │       ├── ListAllTicketsService.ts
│   │   │       ├── ListTicketService.ts
│   │   │       └── UpdateTicketMessageService.ts
│   │   └── users
│   │       ├── dtos
│   │       │   └── ICreateUserDTO.ts
│   │       ├── infra
│   │       │   ├── http
│   │       │   │   ├── controllers
│   │       │   │   │   ├── ForgotPasswordController.ts
│   │       │   │   │   ├── ResetPasswordController.ts
│   │       │   │   │   ├── SessionsController.ts
│   │       │   │   │   └── UsersCrontroller.ts
│   │       │   │   ├── middlewares
│   │       │   │   │   └── confirmAuthenticated.ts
│   │       │   │   └── routes
│   │       │   │       ├── password.routes.ts
│   │       │   │       ├── sessions.routes.ts
│   │       │   │       └── users.routes.ts
│   │       │   └── typeorm
│   │       │       ├── entities
│   │       │       │   ├── User.ts
│   │       │       │   └── UserToken.ts
│   │       │       └── repositories
│   │       │           ├── UserTokensRepository.ts
│   │       │           └── UsersRepository.ts
│   │       ├── providers
│   │       │   └── HashProvider
│   │       │       ├── fakes
│   │       │       │   └── FakeHashProvider.ts
│   │       │       ├── implementations
│   │       │       │   └── BCryptHashProvider.ts
│   │       │       └── models
│   │       │           └── IHashProvider.ts
│   │       ├── repositories
│   │       │   ├── IUserTokensRepository.ts
│   │       │   ├── IUsersRepository.ts
│   │       │   └── fakes
│   │       │       ├── FakeUserTokensRepository.ts
│   │       │       └── FakeUsersRepository.ts
│   │       ├── services
│   │       │   ├── CreateUserService.spec.ts
│   │       │   ├── CreateUserService.ts
│   │       │   ├── FindUserService.ts
│   │       │   ├── ResetPasswordService.spec.ts
│   │       │   ├── ResetPasswordService.ts
│   │       │   ├── SendForgotPasswordEmailService.spec.ts
│   │       │   ├── SendForgotPasswordEmailService.ts
│   │       │   ├── SessionsUserService.spec.ts
│   │       │   └── SessionsUserService.ts
│   │       └── templates
│   │           └── forgot_password.hbs
│   └── shared
│       ├── errors
│       │   └── AppError.ts
│       ├── infra
│       │   ├── http
│       │   │   ├── routes
│       │   │   │   └── index.ts
│       │   │   └── server.ts
│       │   └── typeorm
│       │       ├── index.ts
│       │       └── migrations
│       │           ├── 1603119695857-CreateUsers.ts
│       │           ├── 1603119706839-CreateTickets.ts
│       │           └── 1604615123079-CreateUserTokens.ts
│       └── providers
│           ├── CacheProvider
│           │   ├── dtos
│           │   ├── fakes
│           │   ├── implementations
│           │   │   └── RedisCacheProvider.ts
│           │   └── models
│           │       └── ICacheProvider.ts
│           ├── MailProvider
│           │   ├── dtos
│           │   │   └── ISendMailDTO.ts
│           │   ├── fakes
│           │   │   └── FakeMailProvider.ts
│           │   ├── implementations
│           │   │   ├── EtherealMailProvider.ts
│           │   │   └── SESMailProvider.ts
│           │   └── models
│           │       └── IMailProvider.ts
│           ├── MailTemplateProvider
│           │   ├── dtos
│           │   │   └── IParseMailTemplateDTO.ts
│           │   ├── fakes
│           │   │   └── FakeMailTemplateProvider.ts
│           │   ├── implementations
│           │   │   └── HandlebarsMailTemplateProvider.ts
│           │   └── models
│           │       └── IMailTemplateProvider.ts
│           └── index.ts
├── tsconfig.json
├── yarn-error.log
└── yarn.lock
```

### Funcionalidades desenvolvidas

- Criar sessão do usuário
- Envio de e-mail de recuperação de senha
- Reset de senha do usuário
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

#### Enviar um e-mail de recuperação de senha para um usuário

```json
{
	"email": "albert@migrar.cloud"
}
```

#### Reset de senha do usuário usuário

```json
{
	"password": "123123",
	"token": "af13d558-9bd3-445e-80c8-ffd91bb22a85"
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

