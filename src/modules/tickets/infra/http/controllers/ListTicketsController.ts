import { Request, Response } from 'express';

import TicketsRepository from '@modules/tickets/infra/typeorm/repositories/TicketsRepository';
import ListTicketService from '@modules/tickets/services/ListTicketService';
import RedisCacheProvider from '@shared/providers/CacheProvider/implementations/RedisCacheProvider';

export default class ListTicketsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { ticket_id } = request.params;

    const ticketsRepository = new TicketsRepository();
    const redisCacheProvider = new RedisCacheProvider();

    const findTicket = new ListTicketService(
      ticketsRepository,
      redisCacheProvider,
    );

    const ticket = await findTicket.execute(ticket_id);

    return response.json(ticket);
  }
}
