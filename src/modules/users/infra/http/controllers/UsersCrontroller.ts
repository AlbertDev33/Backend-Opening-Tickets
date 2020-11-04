import { Request, Response } from 'express';

import CreateUserService from '@modules/users/services/CreateUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import FindUserService from '@modules/users/services/FindUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const usersRepository = new UsersRepository();
    const createUser = new CreateUserService(usersRepository);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const usersRepository = new UsersRepository();
    const findUser = new FindUserService(usersRepository);

    const user = await findUser.execute({ id });

    delete user.password;

    return response.json(user);
  }
}
