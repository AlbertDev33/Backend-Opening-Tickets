import Ticket from '@modules/tickets/infra/typeorm/entities/Ticket';
import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';
import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  subject: string;
  message: string;
  user_id: string;
  user_role: string;
  status: string;
  condition: string;
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
    user_role,
    status,
    condition,
  }: IRequest): Promise<Ticket> {
    if (!status) {
      throw new AppError('Invalid status', 406);
    }

    const ticket = await this.ticketsRepository.create({
      subject,
      message,
      user_id,
      user_role,
      status,
      condition,
    });

    await this.cacheProvider.invalidatePrefix('ticketList');

    return ticket;
  }
}

export default CreateTicketService;
