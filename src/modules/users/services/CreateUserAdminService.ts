import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IRolesRepository from '@modules/users/repositories/IRolesRepository';
// import IHashProvider from '@shared/providers/HashProvider/models/IHashProvider';
import User from '@modules/users/infra/typeorm/entities/User';
import Role from '@modules/users/infra/typeorm/entities/Role';

import AppError from '@shared/errors/AppError';

interface IRequest {
  userAdmin_id: string;
  name: string;
  email: string;
  password: string;
  roles_id: Role[];
}

class CreateUserAdminService {
  constructor(
    private usersRepository: IUsersRepository,

    private roleRepository: IRolesRepository, // private hashProvider: IHashProvider,
  ) {}

  public async execute({
    userAdmin_id,
    name,
    email,
    password,
    roles_id,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('E-mail address already in used');
    }

    const checkUserAdmin = await this.usersRepository.findRole(userAdmin_id);

    if (checkUserAdmin !== 'role_admin') {
      throw new AppError('User Unauthorized', 401);
    }

    const roleNameIsAdmin = await this.roleRepository.findById(roles_id);

    if (!roleNameIsAdmin) {
      throw new AppError("Role don't exists!", 400);
    }

    const userAdmin = await this.usersRepository.create({
      name,
      email,
      password,
      roles: roles_id,
    });

    return userAdmin;
  }
}

export default CreateUserAdminService;
