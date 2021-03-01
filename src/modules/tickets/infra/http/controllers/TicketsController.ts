import {
  HttpRequest,
  IRequest,
  IResponse,
} from '@shared/infra/http/ExpressImplementation/HttpRequest';

import CreateTicketService from '@modules/tickets/services/CreateTicketService';
import ListAllTicketsService from '@modules/tickets/services/ListAllTicketsByUserService';
import DeleteTicketService from '@modules/tickets/services/DeleteTicketService';

import TicketsRepository from '@modules/tickets/infra/typeorm/repositories/TicketsRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import RedisCacheProvider from '@shared/providers/CacheProvider/implementations/RedisCacheProvider';
import BCryptHashProvider from '@shared/providers/HashProvider/implementations/BCryptHashProvider';

export default class TicketsController extends HttpRequest {
  public async create(
    request: IRequest,
    response: IResponse,
  ): Promise<IResponse> {
    const { id, userRoles } = request.user;
    const { subject, message } = request.body;

    const ticketsRepository = new TicketsRepository();
    const redisCacheProvider = new RedisCacheProvider();
    const bcryptHashProvider = new BCryptHashProvider();

    const createTicket = new CreateTicketService(
      ticketsRepository,
      redisCacheProvider,
      bcryptHashProvider,
    );

    const ticket = await createTicket.execute({
      subject,
      message,
      user_id: id,
      user_role: userRoles,
    });

    return response.json(ticket);
  }

  public async index(
    request: IRequest,
    response: IResponse,
  ): Promise<IResponse> {
    const { id } = request.user;

    const ticketsRepository = new TicketsRepository();
    const usersRepository = new UsersRepository();
    const redisCacheProvider = new RedisCacheProvider();

    const findAllTickets = new ListAllTicketsService(
      ticketsRepository,
      usersRepository,
      redisCacheProvider,
    );

    const allTicketsUser = await findAllTickets.execute({ user_id: id });

    return response.json(allTicketsUser);
  }

  public async delete(
    request: IRequest,
    response: IResponse,
  ): Promise<IResponse> {
    const { id } = request.body;

    const ticketsRepository = new TicketsRepository();
    const updateTicket = new DeleteTicketService(ticketsRepository);

    await updateTicket.execute(id);

    return response.send();
  }
}
