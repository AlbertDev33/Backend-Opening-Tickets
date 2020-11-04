import { Router } from 'express';

import TicketsController from '@modules/tickets/infra/http/controllers/TicketsController';
import TicketsUpdateController from '@modules/tickets/infra/http/controllers/TicketsUpdateController';
import ListTicketsController from '@modules/tickets/infra/http/controllers/ListTicketsController';

import confirmAuthenticated from '@modules/users/infra/http/middlewares/confirmAuthenticated';

const ticketsRouter = Router();

const ticketsController = new TicketsController();
const ticketsUpdateController = new TicketsUpdateController();
const listTicketsController = new ListTicketsController();

ticketsRouter.get(
  '/:ticket_id',
  confirmAuthenticated,
  listTicketsController.index,
);

ticketsRouter.get('/', confirmAuthenticated, ticketsController.index);

ticketsRouter.post('/', confirmAuthenticated, ticketsController.create);

ticketsRouter.patch(
  '/:ticket_id',
  confirmAuthenticated,
  ticketsUpdateController.update,
);

ticketsRouter.delete('/', confirmAuthenticated, ticketsController.delete);

export default ticketsRouter;
