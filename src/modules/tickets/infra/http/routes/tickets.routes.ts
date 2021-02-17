import { Router } from 'express';

import TicketsController from '@modules/tickets/infra/http/controllers/TicketsController';
import TicketsUpdateController from '@modules/tickets/infra/http/controllers/TicketsUpdateController';
import AdminUpdateTicketsController from '@modules/tickets/infra/http/controllers/AdminUpdateTicketsController';
import ListOpenedTicketsController from '@modules/tickets/infra/http/controllers/ListOpenedTicketsController';
import ListTicketsByIdController from '@modules/tickets/infra/http/controllers/ListTicketsByIdController';
import ListTicketsByAccountableController from '@modules/tickets/infra/http/controllers/ListTicketsByAccountableController';

import confirmUserAuthenticated from '@shared/infra/http/middlewares/confirmUserAuthenticated';
import confirmAdminAuthenticated from '@shared/infra/http/middlewares/confirmAdminAuthenticated';

const ticketsRouter = Router();

const ticketsController = new TicketsController();
const ticketsUpdateController = new TicketsUpdateController();
const adminUpdateTicketsController = new AdminUpdateTicketsController();
const listOpenedticketsController = new ListOpenedTicketsController();
const listTicketsController = new ListTicketsByIdController();
const listTicketsByAccountableController = new ListTicketsByAccountableController();

ticketsRouter.get(
  '/accountable',
  confirmAdminAuthenticated,
  listTicketsByAccountableController.index,
);

ticketsRouter.get(
  '/admin',
  confirmAdminAuthenticated,
  listOpenedticketsController.index,
);

ticketsRouter.get('/', confirmUserAuthenticated, ticketsController.index);

ticketsRouter.get(
  '/:ticket_id',
  confirmUserAuthenticated,
  listTicketsController.index,
);

ticketsRouter.patch(
  '/admin/:ticket_id',
  confirmAdminAuthenticated,
  adminUpdateTicketsController.patch,
);

ticketsRouter.patch(
  '/:ticket_id',
  confirmUserAuthenticated,
  ticketsUpdateController.update,
);

ticketsRouter.post('/', confirmUserAuthenticated, ticketsController.create);

ticketsRouter.delete('/', confirmUserAuthenticated, ticketsController.delete);

export default ticketsRouter;
