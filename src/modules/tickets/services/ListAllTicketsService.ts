import { getCustomRepository } from 'typeorm';

import Ticket from '@modules/tickets/infra/typeorm/entities/Ticket';
import TicketsRepository from '@modules/tickets/infra/typeorm/repositories/TicketsRepository';

import AppError from '@shared/errors/AppError';

class CreateTicketService {
  public async execute(): Promise<Ticket[]> {
    const ticketRepository = getCustomRepository(TicketsRepository);

    const listTickets = await ticketRepository.findAllTickets();

    if (!listTickets) {
      throw new AppError('Ticket finished or not exisit', 404);
    }

    return listTickets;
  }
}

export default CreateTicketService;
