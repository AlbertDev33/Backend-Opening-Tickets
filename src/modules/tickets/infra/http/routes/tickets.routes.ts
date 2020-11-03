import { Router } from 'express';

import CreateTicketService from '@modules/tickets/services/CreateTicketService';
import ListTicketService from '@modules/tickets/services/ListTicketService';
import ListAllTicketsService from '@modules/tickets/services/ListAllTicketsService';
import DeleteTicketService from '@modules/tickets/services/DeleteTicketService';
import UpdateTicketMessageService from '@modules/tickets/services/UpdateTicketMessageService';

import TicketsRepository from '@modules/tickets/infra/typeorm/repositories/TicketsRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import confirmAuthenticated from '@modules/users/infra/http/middlewares/confirmAuthenticated';

const ticketsRouter = Router();

ticketsRouter.get(
  '/:ticket_id',
  confirmAuthenticated,
  async (request, response) => {
    try {
      const { ticket_id } = request.params;

      const ticketsRepository = new TicketsRepository();

      const findTicket = new ListTicketService(ticketsRepository);

      const ticket = await findTicket.execute(ticket_id);

      return response.json(ticket);
    } catch (err) {
      return response.status(err.statusCode).json({ error: err.message });
    }
  },
);

ticketsRouter.get('/', confirmAuthenticated, async (request, response) => {
  try {
    const { id } = request.user;

    const ticketsRepository = new TicketsRepository();
    const usersRepository = new UsersRepository();

    const findAllTickets = new ListAllTicketsService(
      ticketsRepository,
      usersRepository,
    );

    const tickets = await findAllTickets.execute({ user_id: id });

    return response.json(tickets);
  } catch (err) {
    return response.status(401).json({ error: err.message });
  }
});

ticketsRouter.post('/', confirmAuthenticated, async (request, response) => {
  try {
    const { id } = request.user;
    const { subject, message } = request.body;

    const ticketsRepository = new TicketsRepository();
    const createTicket = new CreateTicketService(ticketsRepository);

    const ticket = await createTicket.execute({
      subject,
      message,
      user_id: id,
    });

    return response.json(ticket);
  } catch (err) {
    return response.status(err.statusCode).json({ error: err.message });
  }
});

ticketsRouter.patch(
  '/:ticket_id',
  confirmAuthenticated,
  async (request, response) => {
    try {
      const { id } = request.user;
      const { ticket_id } = request.params;
      const { message } = request.body;

      const ticketsRepository = new TicketsRepository();
      const usersRepository = new UsersRepository();
      const updateTicketMessage = new UpdateTicketMessageService(
        ticketsRepository,
        usersRepository,
      );

      const ticket = await updateTicketMessage.execute({
        user_id: id,
        ticket_id,
        message,
      });

      return response.json(ticket);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  },
);

ticketsRouter.delete('/', confirmAuthenticated, async (request, response) => {
  try {
    const { id } = request.body;

    const ticketsRepository = new TicketsRepository();
    const updateTicket = new DeleteTicketService(ticketsRepository);

    await updateTicket.execute(id);

    return response.send();
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default ticketsRouter;
