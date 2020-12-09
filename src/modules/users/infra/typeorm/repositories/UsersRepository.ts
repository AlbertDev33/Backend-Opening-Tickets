import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';
import Role from '@modules/users/infra/typeorm/entities/Role';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  private ormRepositoryRole: Repository<Role>;

  constructor() {
    this.ormRepository = getRepository(User);

    this.ormRepositoryRole = getRepository(Role);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }

  public async findRole(name: string): Promise<string | undefined> {
    const userRoles = await this.ormRepository.findOne(name, {
      relations: ['roles'],
    });

    const roles = userRoles?.roles;
    const role = roles?.map(r => r.name);

    return role?.toString();
  }

  public async create({
    name,
    email,
    password,
    roles,
  }: ICreateUserDTO): Promise<User> {
    const existsRole = await this.ormRepositoryRole.findByIds(roles);

    const user = this.ormRepository.create({
      name,
      email,
      password,
      roles: existsRole,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
