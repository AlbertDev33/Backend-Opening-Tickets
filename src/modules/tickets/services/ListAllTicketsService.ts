import Ticket from '@modules/tickets/infra/typeorm/entities/Ticket';
import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
}

class CreateTicketService {
  constructor(
    private ticketsRepository: ITicketsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Ticket[]> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const listTickets = await this.ticketsRepository.findAllTickets(user_id);

    if (!listTickets) {
      throw new AppError('Ticket finished or not exisit', 404);
    }

    return listTickets;
  }
}

export default CreateTicketService;
