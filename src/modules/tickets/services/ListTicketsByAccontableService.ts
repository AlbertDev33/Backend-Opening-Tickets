import Ticket from '@modules/tickets/infra/typeorm/entities/Ticket';
import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';

import AppError from '@shared/errors/AppError';

interface IAccountable {
  accountable: string;
}

export default class ListTicketsByAccontableService {
  constructor(private ticketsRepository: ITicketsRepository) {}

  public async execute({
    accountable,
  }: IAccountable): Promise<Ticket[] | null> {
    const accountableTickets = await this.ticketsRepository.findAllTicketsByAccountable(
      accountable,
    );

    if (!accountableTickets) {
      throw new AppError('Do Not found ticket for this user', 400);
    }

    return accountableTickets;
  }
}
