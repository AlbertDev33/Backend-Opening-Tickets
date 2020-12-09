import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UsersController from '@modules/users/infra/http/controllers/UsersCrontroller';

import confirmAuthenticated from '@shared/infra/http/middlewares/confirmAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', confirmAuthenticated, usersController.index);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      roles: Joi.array().required(),
    },
  }),
  usersController.create,
);

export default usersRouter;
