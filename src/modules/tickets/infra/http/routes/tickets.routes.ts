import { Router } from 'express';

import CreateTicketService from '@modules/tickets/services/CreateTicketService';
import ListAllTicketsService from '@modules/tickets/services/ListAllTicketsService';
import DeleteTicketService from '@modules/tickets/services/DeleteTicketService';
import UpdateTicketMessageService from '@modules/tickets/services/UpdateTicketMessageService';

import confirmAuthenticated from '@modules/users/infra/http/middlewares/confirmAuthenticated';

const ticketsRouter = Router();

ticketsRouter.get('/', confirmAuthenticated, async (request, response) => {
  try {
    const findAllTickets = new ListAllTicketsService();

    const tickets = await findAllTickets.execute();

    return response.json(tickets);
  } catch (err) {
    return response.status(err.statusCode).json({ error: err.message });
  }
});

ticketsRouter.post('/', confirmAuthenticated, async (request, response) => {
  try {
    const { id } = request.user;
    const { subject, message } = request.body;

    const createTicket = new CreateTicketService();

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

ticketsRouter.patch('/', confirmAuthenticated, async (request, response) => {
  try {
    const { id } = request.user;
    const { ticket_id, message } = request.body;

    const updateTicketMessage = new UpdateTicketMessageService();

    const ticket = updateTicketMessage.execute({
      user_id: id,
      ticket_id,
      message,
    });

    return response.json(ticket);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

ticketsRouter.delete('/', confirmAuthenticated, async (request, response) => {
  try {
    const { id } = request.body;

    const updateTicket = new DeleteTicketService();

    await updateTicket.execute(id);

    return response.send();
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default ticketsRouter;
