import Ticket from '@modules/tickets/infra/typeorm/entities/Ticket';
import TicketsRepository from '@modules/tickets/repositories/ITicketsRepository';

interface IRequest {
  subject: string;
  message: string;
  user_id: string;
}

class CreateTicketService {
  constructor(private ticketsRepository: TicketsRepository) {}

  public async execute({
    subject,
    message,
    user_id,
  }: IRequest): Promise<Ticket> {
    const ticket = await this.ticketsRepository.create({
      subject,
      message,
      user_id,
    });

    return ticket;
  }
}

export default CreateTicketService;
