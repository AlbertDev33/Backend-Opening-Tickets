import { Request, Response } from 'express';

import ListAllOpenedTicketsService from '@modules/tickets/services/ListAllOpenedTicketsService';
import TicketsRepository from '@modules/tickets/infra/typeorm/repositories/TicketsRepository';

export default class ListOpenedTicketsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const ticketsRepository = new TicketsRepository();

    const listAllOpenedTickets = new ListAllOpenedTicketsService(
      ticketsRepository,
    );

    const listOpenedTickts = await listAllOpenedTickets.execute();

    return response.json(listOpenedTickts);
  }
}
