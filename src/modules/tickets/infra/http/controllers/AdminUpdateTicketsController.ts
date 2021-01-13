import { Request, Response } from 'express';

import AdminUpdateTicketService from '@modules/tickets/services/AdminUpdateTicketService';
import TicketsRepository from '@modules/tickets/infra/typeorm/repositories/TicketsRepository';
import RedisCacheProvider from '@shared/providers/CacheProvider/implementations/RedisCacheProvider';

export default class AdminTicketsController {
  public async patch(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { ticket_id } = request.params;
    const { subject, message, status, condition, conclusion } = request.body;

    const ticketRepository = new TicketsRepository();
    const redisCacheProvider = new RedisCacheProvider();

    const updateTicket = new AdminUpdateTicketService(
      ticketRepository,
      redisCacheProvider,
    );

    const ticket = await updateTicket.execute({
      ticket_id,
      subject,
      message,
      accountable: id,
      status,
      condition,
      conclusion,
    });

    return response.json(ticket);
  }
}
