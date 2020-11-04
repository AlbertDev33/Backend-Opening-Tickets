import { Router } from 'express';

import UsersController from '@modules/users/infra/http/controllers/UsersCrontroller';

import confirmAuthenticated from '@modules/users/infra/http/middlewares/confirmAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', confirmAuthenticated, usersController.index);

usersRouter.post('/', usersController.create);

export default usersRouter;
