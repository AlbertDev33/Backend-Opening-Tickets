import { Router, Request, Response } from 'express';

import SessionsUserService from '@modules/users/services/SessionsUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const usersRouter = Router();

usersRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;

    const usersRepository = new UsersRepository();
    const sesssionUser = new SessionsUserService(usersRepository);

    const { user, token } = await sesssionUser.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  } catch (err) {
    return response.status(err.statusCode).json({ error: err.message });
  }
});

export default usersRouter;
