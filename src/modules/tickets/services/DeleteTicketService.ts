import { getCustomRepository } from 'typeorm';

import TicketsRepository from '@modules/tickets/infra/typeorm/repositories/TicketsRepository';

import AppError from '@shared/errors/AppError';

class DeleteTicketService {
  public async execute(id: string): Promise<void> {
    const ticketRepository = getCustomRepository(TicketsRepository);

    const ticket = await ticketRepository.findById(String(id));

    if (!ticket) {
      throw new AppError('Ticket not found', 404);
    }

    await ticketRepository.delete(id);
  }
}

export default DeleteTicketService;
