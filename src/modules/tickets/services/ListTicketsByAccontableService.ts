import Ticket from '@modules/tickets/infra/typeorm/entities/Ticket';
import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';

import AppError from '@shared/errors/AppError';

interface IAccountable {
  accountable_id: string;
}

export default class ListTicketsByAccontableService {
  constructor(private ticketsRepository: ITicketsRepository) {}

  public async execute({ accountable_id }: IAccountable): Promise<Ticket[]> {
    const accountableTickets = await this.ticketsRepository.findAllTicketsByAccountable(
      accountable_id,
    );

    if (!accountableTickets) {
      throw new AppError('Do Not found ticket for this user', 400);
    }

    return accountableTickets;
  }
}
