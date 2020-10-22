import Ticket from '@modules/tickets/infra/typeorm/entities/Ticket';
import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';

import AppError from '@shared/errors/AppError';

class CreateTicketService {
  constructor(private ticketsRepository: ITicketsRepository) {}

  public async execute(): Promise<Ticket[]> {
    const listTickets = await this.ticketsRepository.findAllTickets();

    if (!listTickets) {
      throw new AppError('Ticket finished or not exisit', 404);
    }

    return listTickets;
  }
}

export default CreateTicketService;
