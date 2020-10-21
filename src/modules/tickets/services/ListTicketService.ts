import { getCustomRepository } from 'typeorm';

import Ticket from '@modules/tickets/infra/typeorm/entities/Ticket';
import TicketsRepository from '@modules/tickets/infra/typeorm/repositories/TicketsRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

class CreateTicketService {
  public async execute({ id }: IRequest): Promise<Ticket | undefined> {
    const ticketRepository = getCustomRepository(TicketsRepository);

    const listTicket = ticketRepository.findById(id);

    if (!listTicket) {
      throw new AppError('Ticket not found', 404);
    }

    return listTicket;
  }
}

export default CreateTicketService;
