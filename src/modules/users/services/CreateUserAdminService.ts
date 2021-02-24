import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IRolesRepository from '@modules/users/repositories/IRolesRepository';
import IHashProvider from '@shared/providers/HashProvider/models/IHashProvider';
import User from '@modules/users/infra/typeorm/entities/User';
import Role from '@modules/users/infra/typeorm/entities/Role';

import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password: string;
  roles_id: Role[];
}

class CreateUserAdminService {
  constructor(
    private usersRepository: IUsersRepository,

    private roleReponsitory: IRolesRepository,

    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    roles_id,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('E-mail address already used');
    }

    const checkUserAdmin = await this.usersRepository.findRole(user_id);

    if (checkUserAdmin !== process.env.USER_ADMIN_ROLE) {
      throw new AppError('User Unauthorized', 401);
    }

    const checkRoleAdmin = await this.roleReponsitory.findById(roles_id);

    if (!checkRoleAdmin) {
      throw new AppError("Role don't exists!", 400);
    }

    if (checkRoleAdmin !== process.env.USER_ADMIN_ROLE) {
      throw new AppError('Only admin user can be registered!');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const userAdmin = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      roles: roles_id,
    });

    return userAdmin;
  }
}

export default CreateUserAdminService;
