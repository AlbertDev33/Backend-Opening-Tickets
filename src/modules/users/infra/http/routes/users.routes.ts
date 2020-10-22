import { Router } from 'express';

import CreateUserService from '@modules/users/services/CreateUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import FindUserService from '@modules/users/services/FindUserService';

import confirmAuthenticated from '@modules/users/infra/http/middlewares/confirmAuthenticated';

const usersRouter = Router();

usersRouter.get('/', confirmAuthenticated, async (request, response) => {
  try {
    const { id } = request.user;

    const usersRepository = new UsersRepository();
    const findUser = new FindUserService(usersRepository);

    const user = await findUser.execute({ id });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(err.statusCode).json({ error: err.message });
  }
});

usersRouter.post('/', async (request, response) => {
  try {
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
  } catch (err) {
    return response.status(err.statusCode).json({ error: err.message });
  }
});

export default usersRouter;
