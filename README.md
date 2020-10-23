# Desafio Técnico - Backend Cirrus

## Projeto em cumprimento ao desafio Alterdada. Trata-se da aplicação de nível INICIANTE.

### Bibliotécas e recursos utilizados no projeto

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

### Referências utilizadas para criar o projeto

- Todos o projeto foi baseado em uma aplicação que eu já havia desenvolvido. Para consultas: https://github.com/AlbertDev33/GoBarber-Simples

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
- Encerrar um tiket (nesse caso ainda está deletando, não consegui desenvolver melhor em tempo hábil)
- Bustar todos os tickets por usuário
- Criar tickets
- Buscar usuário por id
- Criar um usuário

- Não consegui desenvolver os testes automatizados

### Como executar o projeto

- Clone o projeto
- Execute o comando yarn ou npm install (esse projeto foi desenvolvido com yarn)
- Rode o comando yarn dev:server ou altere o script no pakage.json;


## Dúvidas
Caso tenha alguma dúvida entre em contato pelo e-mail: dias.dsn.cir@alterdata.com.br
