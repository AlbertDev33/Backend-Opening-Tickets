import { Request, Response } from 'express';

import SessionsUserService from '@modules/users/services/SessionsUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import BCryptHashProvider from '@modules/users/providers/implementations/BCryptHashProvider';

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

    delete user.password;

    return response.json({ user, token });
  }
}
