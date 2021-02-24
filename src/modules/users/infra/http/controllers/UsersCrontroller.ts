import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import BCryptHashProvider from '@shared/providers/HashProvider/implementations/BCryptHashProvider';

export class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, roles } = request.body;

    const usersRepository = new UsersRepository();
    const hashProvider = new BCryptHashProvider();

    const createUser = new CreateUserService(usersRepository, hashProvider);

    const user = await createUser.execute({
      name,
      email,
      password,
      roles,
    });

    return response.json({ user: classToClass(user) });
  }
}
