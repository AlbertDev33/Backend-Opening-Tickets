import Ticket from '@modules/tickets/infra/typeorm/entities/Ticket';
import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  ticket_id: string;
}

class CreateTicketService {
  constructor(
    private ticketsRepository: ITicketsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    ticket_id,
  }: IRequest): Promise<Ticket | undefined> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const listTicket = await this.ticketsRepository.findById(ticket_id);

    if (!listTicket) {
      throw new AppError('Ticket not found', 404);
    }

    return listTicket;
  }
}

export default CreateTicketService;
