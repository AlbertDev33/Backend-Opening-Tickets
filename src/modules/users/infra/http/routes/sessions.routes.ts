import { Router, Request, Response } from 'express';

import SessionsUserService from '@modules/users/services/SessionsUserService';

const usersRouter = Router();

usersRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;

    const sesssionUser = new SessionsUserService();

    const { user, token } = await sesssionUser.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
