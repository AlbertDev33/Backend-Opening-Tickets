import Ticket from '@modules/tickets/infra/typeorm/entities/Ticket';
import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  ticket_id: string;
  message: string;
}

class UpdateTicketService {
  constructor(
    private ticketsRepository: ITicketsRepository,

    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    ticket_id,
    message,
  }: IRequest): Promise<Ticket> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const ticket = await this.ticketsRepository.findById(ticket_id);

    if (!ticket) {
      throw new AppError('Ticket not found');
    }

    ticket.message = message;

    const newMessage = await this.ticketsRepository.save(ticket);

    return newMessage;
  }
}

export default UpdateTicketService;
