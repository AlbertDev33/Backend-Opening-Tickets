import { getCustomRepository } from 'typeorm';

import Ticket from '@modules/tickets/infra/typeorm/entities/Ticket';
import TicketsRepository from '@modules/tickets/infra/typeorm/repositories/TicketsRepository';

interface IRequest {
  id: string;
}

class CreateTicketService {
  public async execute({ id }: IRequest): Promise<Ticket | undefined> {
    const ticketRepository = getCustomRepository(TicketsRepository);

    const listTicket = ticketRepository.findById(id);

    if (!listTicket) {
      throw new Error('Ticket not found');
    }

    return listTicket;
  }
}

export default CreateTicketService;
