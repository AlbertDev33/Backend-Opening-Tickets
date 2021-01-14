# Sistema de abertura de tickets
### Essa API ainda encontra-se em desenvolvimento (contribuições são bem vindas)

## Informações gerais


Essa API foi desenvolvida utilizando Node.js junto ao Typescript, utilizando conceitos de DDD, TDD e SOLID, tais como:

- Single Responsability Principle;
- Liskov Substitution Principle;
- Dependency Inversion.

## Bancos de Dados utilizados no projeto (rodando no Docker)

- PostgreSQL - Esse banco foi utilizado basicamente pela sua robustez e por ser muito utilizado em ambiente de produção
- Redis - Banco não relacional. Foi utilizado para armazernar algumas consultas em cache, minimizando as chamadas ao banco de dados. A implementação desse recurso traz uma melhora relevante de performance para a aplicação.

## Desafios encontrados para implementação desse projeto

- Um grande desafio e requereu bastante tempo de estudo, foi a adoção de conceitos do SOLID, citados logo acima.

- A aplicação de Testes Unitários é um ponto extremamente importante no desenvolvimento de uma API. Implementar os testes como estão atualmente exigiu bastante tempo de estudo e tentativa e erro.

- Implementar o recurso de cache com Redis exigiu algum tempo de estudo, até o resultado final.

- A configuração do SES da AWS exigiu um bom tempo de estudo e leitura da documentação para chegar até o resultado atual. Está totalmente funcional, bastando apenas incluir as informações de acesso no arquivo .env e realizar os testes (é necessário ter uma configuração de acesso ao serviço da AWS).
## Estrutura de pastas do projeto

```
📦src
 ┣ 📂@types
 ┃ ┗ 📜express.d.ts
 ┣ 📂config
 ┃ ┣ 📜auth.ts
 ┃ ┣ 📜cache.ts
 ┃ ┣ 📜mail.ts
 ┃ ┗ 📜upload.ts
 ┣ 📂modules
 ┃ ┣ 📂tickets
 ┃ ┃ ┣ 📂dtos
 ┃ ┃ ┃ ┣ 📜ICreateTicketDTO.ts
 ┃ ┃ ┃ ┗ 📜IUpdateTicketDTO.ts
 ┃ ┃ ┣ 📂infra
 ┃ ┃ ┃ ┣ 📂http
 ┃ ┃ ┃ ┃ ┣ 📂controllers
 ┃ ┃ ┃ ┃ ┃ ┣ 📜AdminUpdateTicketsController.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜ListOpenedTicketsController.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜ListTicketsController.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜TicketsController.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📜TicketsUpdateController.ts
 ┃ ┃ ┃ ┃ ┗ 📂routes
 ┃ ┃ ┃ ┃ ┃ ┗ 📜tickets.routes.ts
 ┃ ┃ ┃ ┗ 📂typeorm
 ┃ ┃ ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┃ ┃ ┗ 📜Ticket.ts
 ┃ ┃ ┃ ┃ ┗ 📂repositories
 ┃ ┃ ┃ ┃ ┃ ┗ 📜TicketsRepository.ts
 ┃ ┃ ┣ 📂repositories
 ┃ ┃ ┃ ┗ 📜ITicketsRepository.ts
 ┃ ┃ ┗ 📂services
 ┃ ┃ ┃ ┣ 📜AdminUpdateTicketService.ts
 ┃ ┃ ┃ ┣ 📜CreateTicketService.ts
 ┃ ┃ ┃ ┣ 📜DeleteTicketService.ts
 ┃ ┃ ┃ ┣ 📜ListAllOpenedTicketsService.ts
 ┃ ┃ ┃ ┣ 📜ListAllTicketsService.ts
 ┃ ┃ ┃ ┣ 📜ListTicketService.ts
 ┃ ┃ ┃ ┗ 📜UpdateTicketMessageService.ts
 ┃ ┗ 📂users
 ┃ ┃ ┣ 📂dtos
 ┃ ┃ ┃ ┣ 📜ICreatePermissionDTO.ts
 ┃ ┃ ┃ ┣ 📜ICreateRoleDTO.ts
 ┃ ┃ ┃ ┗ 📜ICreateUserDTO.ts
 ┃ ┃ ┣ 📂infra
 ┃ ┃ ┃ ┣ 📂http
 ┃ ┃ ┃ ┃ ┣ 📂controllers
 ┃ ┃ ┃ ┃ ┃ ┣ 📜ForgotPasswordController.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜PermissionsController.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜ProfileController.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜ResetPasswordController.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜RolesController.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜SessionsController.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜UpdateAvatarController.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📜UsersCrontroller.ts
 ┃ ┃ ┃ ┃ ┗ 📂routes
 ┃ ┃ ┃ ┃ ┃ ┣ 📜password.routes.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜permissions.routes.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜profile.routes.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜roles.routes.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜sessions.routes.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📜users.routes.ts
 ┃ ┃ ┃ ┗ 📂typeorm
 ┃ ┃ ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Permission.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Role.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜User.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📜UserToken.ts
 ┃ ┃ ┃ ┃ ┗ 📂repositories
 ┃ ┃ ┃ ┃ ┃ ┣ 📜PermissionsRepository.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜RolesRepository.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜UsersRepository.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📜UserTokensRepository.ts
 ┃ ┃ ┣ 📂repositories
 ┃ ┃ ┃ ┣ 📂fakes
 ┃ ┃ ┃ ┃ ┣ 📜FakePermissionRepository.ts
 ┃ ┃ ┃ ┃ ┣ 📜FakeUsersRepository.ts
 ┃ ┃ ┃ ┃ ┗ 📜FakeUserTokensRepository.ts
 ┃ ┃ ┃ ┣ 📜IPermissionsRepository.ts
 ┃ ┃ ┃ ┣ 📜IRolesRepository.ts
 ┃ ┃ ┃ ┣ 📜IUsersRepository.ts
 ┃ ┃ ┃ ┗ 📜IUserTokensRepository.ts
 ┃ ┃ ┣ 📂services
 ┃ ┃ ┃ ┣ 📜CreatePermissionService.spec.ts
 ┃ ┃ ┃ ┣ 📜CreatePermissionService.ts
 ┃ ┃ ┃ ┣ 📜CreateRoleService.ts
 ┃ ┃ ┃ ┣ 📜CreateUserService.spec.ts
 ┃ ┃ ┃ ┣ 📜CreateUserService.ts
 ┃ ┃ ┃ ┣ 📜FindUserService.ts
 ┃ ┃ ┃ ┣ 📜ListUserRoleService.ts
 ┃ ┃ ┃ ┣ 📜ResetPasswordService.spec.ts
 ┃ ┃ ┃ ┣ 📜ResetPasswordService.ts
 ┃ ┃ ┃ ┣ 📜SendForgotPasswordEmailService.spec.ts
 ┃ ┃ ┃ ┣ 📜SendForgotPasswordEmailService.ts
 ┃ ┃ ┃ ┣ 📜SessionsUserService.spec.ts
 ┃ ┃ ┃ ┣ 📜SessionsUserService.ts
 ┃ ┃ ┃ ┣ 📜ShowProfileService.ts
 ┃ ┃ ┃ ┣ 📜UpdateProfileService.ts
 ┃ ┃ ┃ ┗ 📜UpdateUserAvatarService.ts
 ┃ ┃ ┗ 📂templates
 ┃ ┃ ┃ ┗ 📜forgot_password.hbs
 ┗ 📂shared
 ┃ ┣ 📂errors
 ┃ ┃ ┗ 📜AppError.ts
 ┃ ┣ 📂infra
 ┃ ┃ ┣ 📂http
 ┃ ┃ ┃ ┣ 📂middlewares
 ┃ ┃ ┃ ┃ ┣ 📜confirmAdminAuthenticated.ts
 ┃ ┃ ┃ ┃ ┗ 📜confirmUserAuthenticated.ts
 ┃ ┃ ┃ ┣ 📂routes
 ┃ ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┃ ┗ 📜server.ts
 ┃ ┃ ┗ 📂typeorm
 ┃ ┃ ┃ ┣ 📂migrations
 ┃ ┃ ┃ ┃ ┣ 📜1603119695857-CreateUsers.ts
 ┃ ┃ ┃ ┃ ┣ 📜1604615123079-CreateUserTokens.ts
 ┃ ┃ ┃ ┃ ┣ 📜1606749213850-CreatePermissions.ts
 ┃ ┃ ┃ ┃ ┣ 📜1606749525665-CreateRoles.ts
 ┃ ┃ ┃ ┃ ┣ 📜1606765201191-CreatePermissionsRoles.ts
 ┃ ┃ ┃ ┃ ┣ 📜1606773554297-CreateusersRoles.ts
 ┃ ┃ ┃ ┃ ┣ 📜1608153473959-CreateTickets.ts
 ┃ ┃ ┃ ┃ ┗ 📜1610408177969-AddAvatarFieldToUsers.ts
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┗ 📂providers
 ┃ ┃ ┣ 📂CacheProvider
 ┃ ┃ ┃ ┣ 📂implementations
 ┃ ┃ ┃ ┃ ┗ 📜RedisCacheProvider.ts
 ┃ ┃ ┃ ┗ 📂models
 ┃ ┃ ┃ ┃ ┗ 📜ICacheProvider.ts
 ┃ ┃ ┣ 📂HashProvider
 ┃ ┃ ┃ ┣ 📂fakes
 ┃ ┃ ┃ ┃ ┗ 📜FakeHashProvider.ts
 ┃ ┃ ┃ ┣ 📂implementations
 ┃ ┃ ┃ ┃ ┗ 📜BCryptHashProvider.ts
 ┃ ┃ ┃ ┗ 📂models
 ┃ ┃ ┃ ┃ ┗ 📜IHashProvider.ts
 ┃ ┃ ┣ 📂MailProvider
 ┃ ┃ ┃ ┣ 📂dtos
 ┃ ┃ ┃ ┃ ┗ 📜ISendMailDTO.ts
 ┃ ┃ ┃ ┣ 📂fakes
 ┃ ┃ ┃ ┃ ┗ 📜FakeMailProvider.ts
 ┃ ┃ ┃ ┣ 📂implementations
 ┃ ┃ ┃ ┃ ┣ 📜EtherealMailProvider.ts
 ┃ ┃ ┃ ┃ ┗ 📜SESMailProvider.ts
 ┃ ┃ ┃ ┗ 📂models
 ┃ ┃ ┃ ┃ ┗ 📜IMailProvider.ts
 ┃ ┃ ┣ 📂MailTemplateProvider
 ┃ ┃ ┃ ┣ 📂dtos
 ┃ ┃ ┃ ┃ ┗ 📜IParseMailTemplateDTO.ts
 ┃ ┃ ┃ ┣ 📂fakes
 ┃ ┃ ┃ ┃ ┗ 📜FakeMailTemplateProvider.ts
 ┃ ┃ ┃ ┣ 📂implementations
 ┃ ┃ ┃ ┃ ┗ 📜HandlebarsMailTemplateProvider.ts
 ┃ ┃ ┃ ┗ 📂models
 ┃ ┃ ┃ ┃ ┗ 📜IMailTemplateProvider.ts
 ┃ ┃ ┣ 📂StorageProvider
 ┃ ┃ ┃ ┣ 📂implementations
 ┃ ┃ ┃ ┃ ┣ 📜DiskStorageProvider.ts
 ┃ ┃ ┃ ┃ ┗ 📜S3StorageProvider.ts
 ┃ ┃ ┃ ┗ 📂models
 ┃ ┃ ┃ ┃ ┗ 📜IStorageProvider.ts
 ┃ ┃ ┗ 📜index.ts
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
- Criar um usuário comum e usuário administrador
- Painel de listagem e alteração de um ticket (ao alterar um ticket, automáticamente o administrador se torna o responsável por aquele chamado).

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
	"email": "albert@email.com"
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
- Crie uma chave secreta para que o token gerado seja validado e insira na variável ambiente APP_SECRET
- Para o envio de e-mail utilizando os recursos do SES será necessário inserir suas credenciais da AWS nas variáveis ambiente AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_DEFAULT_REGION
- Altere a variável ambiente MAIL_DRIVER com o valor ses
- Substitua as credenciais de acesso ao banco de dados no arquivo ormconfig.json
- Coloque seu banco de dados em funcionamento para que a API possa se conectar.
- Rode o comando yarn dev:server ou altere o script no pakage.json;

### Problemas e dúvidas

Qualquer problema ou dúvida, fiquem a vontade para contribuir ou entrar em contato. Lembrando que essa API ainda encontra-se em desenvolvimento. Há bastante features para serem implementadas/melhoradas.

