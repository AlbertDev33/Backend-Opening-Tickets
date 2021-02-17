import { Request, Response } from 'express';
import crypto from 'crypto';

import CreateTicketService from '@modules/tickets/services/CreateTicketService';
import ListAllTicketsService from '@modules/tickets/services/ListAllTicketsByUserService';
import DeleteTicketService from '@modules/tickets/services/DeleteTicketService';

import TicketsRepository from '@modules/tickets/infra/typeorm/repositories/TicketsRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import RedisCacheProvider from '@shared/providers/CacheProvider/implementations/RedisCacheProvider';

export default class TicketsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id, userRoles } = request.user;
    const { subject, message } = request.body;

    const ticketsRepository = new TicketsRepository();
    const redisCacheProvider = new RedisCacheProvider();

    const createTicket = new CreateTicketService(
      ticketsRepository,
      redisCacheProvider,
    );
    const conditionStatus = 'Em dia';
    const statusInformation = 'Aberto';

    const hashDate = crypto.randomBytes(4).toString('hex');
    const date = new Date();
    const ticketIdentifier = `${hashDate}-${date.getFullYear()}`;

    const ticket = await createTicket.execute({
      identifier: ticketIdentifier,
      subject,
      message,
      user_id: id,
      user_role: userRoles,
      status: statusInformation,
      condition: conditionStatus,
    });

    return response.json(ticket);
  }

  public async index(request: Request, response: Response): Promise<Response> {
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

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const ticketsRepository = new TicketsRepository();
    const updateTicket = new DeleteTicketService(ticketsRepository);

    await updateTicket.execute(id);

    return response.send();
  }
}
