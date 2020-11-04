import { Request, Response } from 'express';

import UpdateTicketMessageService from '@modules/tickets/services/UpdateTicketMessageService';

import TicketsRepository from '@modules/tickets/infra/typeorm/repositories/TicketsRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

export default class TicketsEditController {
  public async update(request: Request, response: Response): Promise<Response> {
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
  }
}
