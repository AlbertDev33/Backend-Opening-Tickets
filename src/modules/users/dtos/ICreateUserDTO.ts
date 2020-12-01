import Role from '@modules/users/infra/typeorm/entities/Role';

export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  roles: Role[];
}
