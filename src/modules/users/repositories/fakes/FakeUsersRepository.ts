import { uuid } from 'uuidv4';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';
import Role from '@modules/users/infra/typeorm/entities/Role';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  private roles: Role[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  // Método inserido apenas no fake
  public async findRoleById(role_id: Role[]): Promise<string | undefined> {
    const parseRoleId = role_id.toString();

    const findRole = this.roles.filter(role => role.id === parseRoleId);

    const roleName = findRole.map(name => name.name);

    return roleName.toString();
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async findRole(user_id: string): Promise<string | undefined> {
    const findRole = this.users.find(role => role.roles);

    const nameRole = findRole?.roles;
    const roleName = nameRole?.map(name => name.name);

    return roleName?.toString();
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const userData = new User();

    this.users.push(user);

    return userData;
  }
}

export default FakeUsersRepository;
