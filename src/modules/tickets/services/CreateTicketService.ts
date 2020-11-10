import Ticket from '@modules/tickets/infra/typeorm/entities/Ticket';
import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';
import ICacheProvider from '@shared/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  subject: string;
  message: string;
  user_id: string;
}

class CreateTicketService {
  constructor(
    private ticketsRepository: ITicketsRepository,

    private cacheProvider: ICacheProvider,
  ) {}

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

    await this.cacheProvider.invalidatePrefix('ticketList');

    return ticket;
  }
}

export default CreateTicketService;
