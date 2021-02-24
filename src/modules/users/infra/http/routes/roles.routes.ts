import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import RolesController from '@modules/users/infra/http/controllers/RolesController';
import ListAllRolesController from '@modules/users/infra/http/controllers/ListAllRolesController';

const rolesRouter = Router();
const rolesController = new RolesController();
const listAllRolesController = new ListAllRolesController();

rolesRouter.get('/', listAllRolesController.index);

rolesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      permissions: Joi.array().required(),
    },
  }),
  rolesController.create,
);

export default rolesRouter;
