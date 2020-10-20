import { Router } from 'express';

import CreateTicketService from '@modules/tickets/services/CreateTicketService';

const usersRouter = Router();

usersRouter.post('/:user_id', async (request, response) => {
  try {
    const { user_id } = request.params;
    const { subject, message } = request.body;

    const createTicket = new CreateTicketService();

    const ticket = await createTicket.execute({
      subject,
      message,
      user_id,
    });

    return response.json(ticket);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
