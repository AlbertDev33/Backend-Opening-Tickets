import { getCustomRepository } from 'typeorm';

import Ticket from '@modules/tickets/infra/typeorm/entities/Ticket';
import TicketsRepository from '@modules/tickets/infra/typeorm/repositories/TicketsRepository';

interface IRequest {
  subject: string;
  message: string;
  user_id: string;
}

class CreateTicketService {
  public async execute({
    subject,
    message,
    user_id,
  }: IRequest): Promise<Ticket> {
    const ticketRepository = getCustomRepository(TicketsRepository);

    const ticket = await ticketRepository.create({
      subject,
      message,
      user_id,
    });

    return ticket;
  }
}

export default CreateTicketService;
