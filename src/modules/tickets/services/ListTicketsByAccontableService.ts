import Ticket from '@modules/tickets/infra/typeorm/entities/Ticket';
import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import AppError from '@shared/errors/AppError';

interface IAccountable {
  accountable_id: string;
}

export default class ListTicketsByAccontableService {
  constructor(
    private usersRepository: IUsersRepository,

    private ticketsRepository: ITicketsRepository,
  ) {}

  public async execute({ accountable_id }: IAccountable): Promise<Ticket[]> {
    const accountableExists = await this.usersRepository.findById(
      accountable_id,
    );

    if (!accountableExists) {
      throw new AppError('User does not exists', 400);
    }

    const accountableTickets = await this.ticketsRepository.findAllTicketsByAccountable(
      accountable_id,
    );

    return accountableTickets;
  }
}
