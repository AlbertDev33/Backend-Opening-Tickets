import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';

import AppError from '@shared/errors/AppError';

class DeleteTicketService {
  constructor(private ticketsRepository: ITicketsRepository) {}

  public async execute(ticket_id: string): Promise<void> {
    const ticket = await this.ticketsRepository.findById(ticket_id);

    if (!ticket) {
      throw new AppError('Ticket not found', 404);
    }

    await this.ticketsRepository.delete(ticket_id);
  }
}

export default DeleteTicketService;
