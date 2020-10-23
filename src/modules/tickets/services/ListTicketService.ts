import Ticket from '@modules/tickets/infra/typeorm/entities/Ticket';
import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';

import AppError from '@shared/errors/AppError';

class CreateTicketService {
  constructor(private ticketsRepository: ITicketsRepository) {}

  public async execute(ticket_id: string): Promise<Ticket | undefined> {
    const listTicket = await this.ticketsRepository.findById(ticket_id);

    if (!listTicket) {
      throw new AppError('Ticket not found', 404);
    }

    return listTicket;
  }
}

export default CreateTicketService;
