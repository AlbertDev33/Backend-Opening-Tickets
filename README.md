# Sistema de abertura de tickets
### Essa API ainda encontra-se em desenvolvimento (contribuições são bem vindas)

## Informações gerais


Essa API foi desenvolvida utilizando Node.js junto ao Typescript, utilizando conceitos do SOLID.

## Bancos de Dados utilizados no projeto

- PostgreSQL - Esse banco foi utilizado basicamente pela sua robustez e por ser muito utilizado em ambiente de produção

- Redis - Banco não relacional. Foi utilizado para armazernar consultas em cache, minimizando as chamadas ao banco de dados. A implementação desse recurso traz uma melhora relevante de performance para a aplicação.

## Alguns exemplos dessa API

#### Criar um usuário (rota post '/users')

```json
{
  "user": {
    "name": "Example User",
    "email": "User@user.com",
    "roles": [
      {
        "id": "8d08c062-ee66-4771-9424-44efdb500023",
        "name": "ROLE_USER",
        "description": "User",
        "created_at": "2021-01-19T04:23:30.553Z",
        "updated_at": "2021-01-19T04:23:30.553Z"
      }
    ],
    "id": "2b0caac8-13dc-444e-9cf2-09b623bcc4db",
    "created_at": "2021-03-01T21:44:59.565Z",
    "updated_at": "2021-03-01T21:44:59.565Z",
    "avatar_url": null
  }
}
```

#### Update Profile (rota patch 'profile')

```json
{
  "user": {
    "id": "2b0caac8-13dc-444e-9cf2-09b623bcc4db",
    "name": "New Example User",
    "email": "User@user.com",
    "avatar": null,
    "created_at": "2021-03-01T21:44:59.565Z",
    "updated_at": "2021-03-01T21:48:48.568Z",
    "avatar_url": null
  }
}
```

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
#### Update do avatar (rota patch '/users/avatar'
)
```json
{
  "updateAvatar": {
    "id": "23139537-ea52-4309-b07d-43aff50b3582",
    "name": "Poliana Rocha",
    "email": "poliana@migrar.cloud",
    "avatar": "cdb28bf944a10df97d81-Eu.png",
    "created_at": "2021-01-19T04:24:14.180Z",
    "updated_at": "2021-02-16T21:30:08.226Z",
    "avatar_url": "http://locahost:3333/files/cdb28bf944a10df97d81-Eu.png"
  }
}
```

#### Criar um usuário administrador (rota post '/users/userAdmin')

```json
{
  "userAdmin": {
    "name": "User Admin",
    "email": "useradmin@migrar.cloud",
    "roles": [
      {
        "id": "74629ffa-e274-46b6-a5e0-3cc6d083f04f",
        "name": "ROLE_ADMIN",
        "description": "Admin",
        "created_at": "2021-01-19T04:10:49.897Z",
        "updated_at": "2021-01-19T04:10:49.897Z"
      }
    ],
    "id": "925d64fe-9243-48bf-b77b-edcb484c4397",
    "created_at": "2021-03-01T21:53:56.456Z",
    "updated_at": "2021-03-01T21:53:56.456Z",
    "avatar_url": null
  }
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

#### Listar todos os tickets abertos para o administrador (rota get '/tickes/admin')

```json
[
  {
    "id": "4feffdd6-862d-4820-94a0-90d529bfed17",
    "identifier": "2b04tsi0ya-2021",
    "subject": "Criando ticket de exemplo",
    "message": "Testando a listagem de tickets abertos",
    "user_id": "23139537-ea52-4309-b07d-43aff50b3582",
    "user_role": "ROLE_USER",
    "accountable": null,
    "status": "Aberto",
    "condition": "Em dia",
    "conclusion": null,
    "created_at": "2021-02-22T03:09:38.431Z",
    "updated_at": "2021-02-22T03:09:38.431Z"
  }
]
```

#### Listando tickets sob responsabilidade do administrador - accountable - (rota get 'tickets/accountable')

```json
[
  {
    "id": "c1cab415-d604-45c8-bc3a-b529cd1cbc3a",
    "identifier": "2b04sfO65C-2021",
    "subject": "Testando listagem",
    "message": "Verificando listagem",
    "user_id": "23139537-ea52-4309-b07d-43aff50b3582",
    "user_role": "ROLE_USER",
    "accountable": "18dbd8c8-b9ef-44b1-b237-facbfeea8726",
    "status": "Concluído",
    "condition": "Em atrazo",
    "conclusion": "2021-02-28T21:19:42.126Z",
    "created_at": "2021-02-22T03:09:01.958Z",
    "updated_at": "2021-03-01T00:19:42.211Z"
  }
]
```

#### Enviar um e-mail de recuperação de senha para um usuário

```json
{
	"email": "userexample@email.com"
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

- Clone esse projeto para seu ambiente de desenvolvimento;
- Execute o comando yarn ou npm install (esse projeto foi desenvolvido com yarn) para instalar todas as dependências;
- Crie uma chave secreta para que o token gerado seja validado e insira na variável ambiente APP_SECRET;
- Para o envio de e-mail utilizando os recursos do SES será necessário inserir suas credenciais da AWS nas variáveis ambiente AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_DEFAULT_REGION;
- Altere a variável ambiente MAIL_DRIVER com o valor ses;
- Substitua as credenciais de acesso aos bancos de dados no arquivo ormconfig.json. Lembrando que esse projeto utiliza PostgreSQL e Redis;
- Coloque seu banco de dados em funcionamento para que a API possa se conectar;
- Rode o comando yarn dev:server ou altere o script no pakage.json;

## Testes

- Para rodas os testes utilize o comando yarn test

### Problemas e dúvidas

Qualquer problema ou dúvida, fiquem a vontade para contribuir. Lembrando que essa API ainda encontra-se em desenvolvimento. Há bastante features para serem implementadas/melhoradas.

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
 ┃ ┃ ┃ ┃ ┃ ┣ 📜ListTicketsByAccountableController.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜ListTicketsByIdController.ts
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
 ┃ ┃ ┃ ┣ 📂fakes
 ┃ ┃ ┃ ┃ ┗ 📜FakeTicketsRepository.ts
 ┃ ┃ ┃ ┗ 📜ITicketsRepository.ts
 ┃ ┃ ┗ 📂services
 ┃ ┃ ┃ ┣ 📜AdminUpdateTicketService.spec.ts
 ┃ ┃ ┃ ┣ 📜AdminUpdateTicketService.ts
 ┃ ┃ ┃ ┣ 📜CreateTicketService.spec.ts
 ┃ ┃ ┃ ┣ 📜CreateTicketService.ts
 ┃ ┃ ┃ ┣ 📜DeleteTicketService.spec.ts
 ┃ ┃ ┃ ┣ 📜DeleteTicketService.ts
 ┃ ┃ ┃ ┣ 📜ListAllOpenedTicketsService.spec.ts
 ┃ ┃ ┃ ┣ 📜ListAllOpenedTicketsService.ts
 ┃ ┃ ┃ ┣ 📜ListAllTicketsByUserService.spec.ts
 ┃ ┃ ┃ ┣ 📜ListAllTicketsByUserService.ts
 ┃ ┃ ┃ ┣ 📜ListTicketsByAccontableService.spec.ts
 ┃ ┃ ┃ ┣ 📜ListTicketsByAccontableService.ts
 ┃ ┃ ┃ ┣ 📜ListTicketService.spec.ts
 ┃ ┃ ┃ ┣ 📜ListTicketService.ts
 ┃ ┃ ┃ ┣ 📜UpdateTicketMessageService.spec.ts
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
 ┃ ┃ ┃ ┃ ┃ ┣ 📜ListAllRolesController.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜PermissionsController.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜ProfileController.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜ResetPasswordController.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜RolesController.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜SessionsController.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜UpdateAvatarController.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜UsersAdminController.ts
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
 ┃ ┃ ┃ ┃ ┣ 📜FakeRolesRepository.ts
 ┃ ┃ ┃ ┃ ┣ 📜FakeUsersRepository.ts
 ┃ ┃ ┃ ┃ ┗ 📜FakeUserTokensRepository.ts
 ┃ ┃ ┃ ┣ 📜IPermissionsRepository.ts
 ┃ ┃ ┃ ┣ 📜IRolesRepository.ts
 ┃ ┃ ┃ ┣ 📜IUsersRepository.ts
 ┃ ┃ ┃ ┗ 📜IUserTokensRepository.ts
 ┃ ┃ ┣ 📂services
 ┃ ┃ ┃ ┣ 📜CreatePermissionService.spec.ts
 ┃ ┃ ┃ ┣ 📜CreatePermissionService.ts
 ┃ ┃ ┃ ┣ 📜CreateRoleService.spec.ts
 ┃ ┃ ┃ ┣ 📜CreateRoleService.ts
 ┃ ┃ ┃ ┣ 📜CreateUserAdminService.spec.ts
 ┃ ┃ ┃ ┣ 📜CreateUserAdminService.ts
 ┃ ┃ ┃ ┣ 📜CreateUserService.spec.ts
 ┃ ┃ ┃ ┣ 📜CreateUserService.ts
 ┃ ┃ ┃ ┣ 📜ListAllRolesService.spec.ts
 ┃ ┃ ┃ ┣ 📜ListAllRolesService.ts
 ┃ ┃ ┃ ┣ 📜ResetPasswordService.spec.ts
 ┃ ┃ ┃ ┣ 📜ResetPasswordService.ts
 ┃ ┃ ┃ ┣ 📜SendForgotPasswordEmailService.spec.ts
 ┃ ┃ ┃ ┣ 📜SendForgotPasswordEmailService.ts
 ┃ ┃ ┃ ┣ 📜SessionsUserService.spec.ts
 ┃ ┃ ┃ ┣ 📜SessionsUserService.ts
 ┃ ┃ ┃ ┣ 📜ShowProfileService.spec.ts
 ┃ ┃ ┃ ┣ 📜ShowProfileService.ts
 ┃ ┃ ┃ ┣ 📜UpdateProfileService.spec.ts
 ┃ ┃ ┃ ┣ 📜UpdateProfileService.ts
 ┃ ┃ ┃ ┣ 📜UpdateUserAvatarService.spec.ts
 ┃ ┃ ┃ ┗ 📜UpdateUserAvatarService.ts
 ┃ ┃ ┗ 📂templates
 ┃ ┃ ┃ ┗ 📜forgot_password.hbs
 ┗ 📂shared
 ┃ ┣ 📂errors
 ┃ ┃ ┗ 📜AppError.ts
 ┃ ┣ 📂infra
 ┃ ┃ ┣ 📂http
 ┃ ┃ ┃ ┣ 📂ExpressImplementation
 ┃ ┃ ┃ ┃ ┗ 📜HttpRequest.ts
 ┃ ┃ ┃ ┣ 📂middlewares
 ┃ ┃ ┃ ┃ ┣ 📜confirmAdminAuthenticated.ts
 ┃ ┃ ┃ ┃ ┗ 📜confirmUserAuthenticated.ts
 ┃ ┃ ┃ ┣ 📂routes
 ┃ ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┃ ┣ 📜index.ts
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
 ┃ ┃ ┃ ┣ 📂fakes
 ┃ ┃ ┃ ┃ ┗ 📜FakeCacheProvider.ts
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
 ┃ ┃ ┃ ┣ 📂fakes
 ┃ ┃ ┃ ┃ ┗ 📜FakeStorageProvider.ts
 ┃ ┃ ┃ ┣ 📂implementations
 ┃ ┃ ┃ ┃ ┣ 📜DiskStorageProvider.ts
 ┃ ┃ ┃ ┃ ┗ 📜S3StorageProvider.ts
 ┃ ┃ ┃ ┗ 📂models
 ┃ ┃ ┃ ┃ ┗ 📜IStorageProvider.ts
 ┃ ┃ ┗ 📜index.ts
```

