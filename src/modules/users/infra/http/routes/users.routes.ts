import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';

import uploadConfig from 'config/upload';

import UsersController from '@modules/users/infra/http/controllers/UsersCrontroller';
import UpdateAvatarController from '@modules/users/infra/http/controllers/UpdateAvatarController';
import UsersAdminController from '@modules/users/infra/http/controllers/UsersAdminController';

import confirmAdminAuthenticated from '@shared/infra/http/middlewares/confirmAdminAuthenticated';
import confirmUserAuthenticated from '@shared/infra/http/middlewares/confirmUserAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig.multer);
const usersController = new UsersController();
const updateAvatarController = new UpdateAvatarController();
const usersAdminController = new UsersAdminController();

usersRouter.get('/', confirmAdminAuthenticated, usersController.index);

usersRouter.post(
  '/userAdmin',
  confirmAdminAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      roles: Joi.array().required(),
    },
  }),
  usersAdminController.create,
);

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

usersRouter.patch(
  '/avatar',
  confirmUserAuthenticated || confirmAdminAuthenticated,
  upload.single('avatar'),
  updateAvatarController.update,
);

export default usersRouter;
