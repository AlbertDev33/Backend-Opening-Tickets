import { Router } from 'express';

import TicketsController from '@modules/tickets/infra/http/controllers/TicketsController';
import TicketsUpdateController from '@modules/tickets/infra/http/controllers/TicketsUpdateController';
import AdminUpdateTicketsController from '@modules/tickets/infra/http/controllers/AdminUpdateTicketsController';
import ListOpenedTicketsController from '@modules/tickets/infra/http/controllers/ListOpenedTicketsController';
import ListTicketsController from '@modules/tickets/infra/http/controllers/ListTicketsController';

import confirmUserAuthenticated from '@shared/infra/http/middlewares/confirmUserAuthenticated';
import confirmAdminAuthenticated from '@shared/infra/http/middlewares/confirmAdminAuthenticated';

const ticketsRouter = Router();

const ticketsController = new TicketsController();
const ticketsUpdateController = new TicketsUpdateController();
const adminUpdateTicketsController = new AdminUpdateTicketsController();
const listOpenedticketsController = new ListOpenedTicketsController();
const listTicketsController = new ListTicketsController();

ticketsRouter.get(
  '/admin',
  confirmAdminAuthenticated,
  listOpenedticketsController.index,
);

ticketsRouter.patch(
  '/admin/:ticket_id',
  confirmAdminAuthenticated,
  adminUpdateTicketsController.patch,
);

ticketsRouter.get(
  '/:ticket_id',
  confirmUserAuthenticated,
  listTicketsController.index,
);

ticketsRouter.get('/', confirmUserAuthenticated, ticketsController.index);

ticketsRouter.post('/', confirmUserAuthenticated, ticketsController.create);

ticketsRouter.patch(
  '/:ticket_id',
  confirmUserAuthenticated,
  ticketsUpdateController.update,
);

ticketsRouter.delete('/', confirmUserAuthenticated, ticketsController.delete);

export default ticketsRouter;
