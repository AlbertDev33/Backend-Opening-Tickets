import { getCustomRepository } from 'typeorm';

import Ticket from '@modules/tickets/infra/typeorm/entities/Ticket';
import TicketsRepository from '@modules/tickets/infra/typeorm/repositories/TicketsRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  ticket_id: string;
  message: string;
}

class UpdateTicketService {
  public async execute({
    user_id,
    ticket_id,
    message,
  }: IRequest): Promise<Ticket> {
    const ticketRepository = getCustomRepository(TicketsRepository);
    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const ticket = await ticketRepository.findById(ticket_id);

    if (!ticket) {
      throw new AppError('Ticket not found');
    }

    ticket.message = message;

    const newMessage = ticketRepository.save(ticket);

    return newMessage;
  }
}

export default UpdateTicketService;
