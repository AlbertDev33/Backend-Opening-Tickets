import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import CreateUserAdminService from '@modules/users/services/CreateUserAdminService';
import RolesRepository from '@modules/users/infra/typeorm/repositories/RolesRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import BCryptHashProvider from '@shared/providers/HashProvider/implementations/BCryptHashProvider';

export default class UsersAdminController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { name, email, password, roles } = request.body;

    const usersRepository = new UsersRepository();
    const rolesReponsitory = new RolesRepository();
    const bcryptHashProvider = new BCryptHashProvider();

    const createUserAdmin = new CreateUserAdminService(
      usersRepository,
      rolesReponsitory,
      bcryptHashProvider,
    );

    const userAdmin = await createUserAdmin.execute({
      user_id: id,
      name,
      email,
      password,
      roles_id: roles,
    });

    return response.json({ userAdmin: classToClass(userAdmin) });
  }
}
