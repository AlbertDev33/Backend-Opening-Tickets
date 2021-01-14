import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import SessionsUserService from '@modules/users/services/SessionsUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import BCryptHashProvider from '@shared/providers/HashProvider/implementations/BCryptHashProvider';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const usersRepository = new UsersRepository();
    const hashProvider = new BCryptHashProvider();

    const sesssionUser = new SessionsUserService(usersRepository, hashProvider);

    const { user, token } = await sesssionUser.execute({
      email,
      password,
    });

    return response.json({ user: classToClass(user), token });
  }
}
