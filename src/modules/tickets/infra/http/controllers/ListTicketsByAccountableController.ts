import {
  HttpRequest,
  IRequest,
  IResponse,
} from '@shared/infra/http/ExpressImplementation/HttpRequest';

import ListTicketsByAccontableService from '@modules/tickets/services/ListTicketsByAccontableService';
import TicketsRepository from '@modules/tickets/infra/typeorm/repositories/TicketsRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

export default class ListTicketsByAccountableController extends HttpRequest {
  public async index(
    request: IRequest,
    response: IResponse,
  ): Promise<IResponse> {
    const { id } = request.user;

    const ticketRepository = new TicketsRepository();
    const usersRepository = new UsersRepository();

    const listTicketsByAccountable = new ListTicketsByAccontableService(
      usersRepository,
      ticketRepository,
    );

    const ticketsAccountable = await listTicketsByAccountable.execute({
      accountable_id: id,
    });

    return response.json(ticketsAccountable);
  }
}
