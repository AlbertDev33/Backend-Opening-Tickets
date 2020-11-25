import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AgentsController from '@modules/agents/infra/http/controllers/AgentsControllers';

const agentsRouter = Router();
const agentsController = new AgentsController();

agentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  agentsController.create,
);

export default agentsRouter;
