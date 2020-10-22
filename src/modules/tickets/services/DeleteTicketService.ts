import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';

import AppError from '@shared/errors/AppError';

class DeleteTicketService {
  constructor(private ticketsRepository: ITicketsRepository) {}

  public async execute(id: string): Promise<void> {
    const ticket = await this.ticketsRepository.findById(String(id));

    if (!ticket) {
      throw new AppError('Ticket not found', 404);
    }

    await this.ticketsRepository.delete(id);
  }
}

export default DeleteTicketService;
