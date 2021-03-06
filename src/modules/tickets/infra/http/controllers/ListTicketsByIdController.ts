import {
  HttpRequest,
  IRequest,
  IResponse,
} from '@shared/infra/http/ExpressImplementation/HttpRequest';

import TicketsRepository from '@modules/tickets/infra/typeorm/repositories/TicketsRepository';
import ListTicketService from '@modules/tickets/services/ListTicketService';
import RedisCacheProvider from '@shared/providers/CacheProvider/implementations/RedisCacheProvider';

export default class ListTicketsByIdController extends HttpRequest {
  public async index(
    request: IRequest,
    response: IResponse,
  ): Promise<IResponse> {
    const { ticket_id } = request.params;

    const ticketsRepository = new TicketsRepository();
    const redisCacheProvider = new RedisCacheProvider();

    const listTickets = new ListTicketService(
      ticketsRepository,
      redisCacheProvider,
    );

    const ticket = await listTickets.execute(ticket_id);

    return response.json(ticket);
  }
}
