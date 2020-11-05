import { Request, Response } from 'express';

import CreateTicketService from '@modules/tickets/services/CreateTicketService';
import ListAllTicketsService from '@modules/tickets/services/ListAllTicketsService';
import DeleteTicketService from '@modules/tickets/services/DeleteTicketService';

import TicketsRepository from '@modules/tickets/infra/typeorm/repositories/TicketsRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

export default class TicketsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { subject, message } = request.body;

    const ticketsRepository = new TicketsRepository();
    const createTicket = new CreateTicketService(ticketsRepository);

    const ticket = await createTicket.execute({
      subject,
      message,
      user_id: id,
    });

    return response.json(ticket);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const ticketsRepository = new TicketsRepository();
    const usersRepository = new UsersRepository();

    const findAllTickets = new ListAllTicketsService(
      ticketsRepository,
      usersRepository,
    );

    const tickets = await findAllTickets.execute({ user_id: id });

    return response.json(tickets);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const ticketsRepository = new TicketsRepository();
    const updateTicket = new DeleteTicketService(ticketsRepository);

    await updateTicket.execute(id);

    return response.send();
  }
}