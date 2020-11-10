import Ticket from '@modules/tickets/infra/typeorm/entities/Ticket';
import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';
import ICacheProvider from '@shared/providers/CacheProvider/models/ICacheProvider';

// import AppError from '@shared/errors/AppError';

class CreateTicketService {
  constructor(
    private ticketsRepository: ITicketsRepository,

    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(ticket_id: string): Promise<Ticket | null> {
    let listTicket = await this.cacheProvider.recover<Ticket>(
      `ticketList:${ticket_id}`,
    );

    if (!listTicket) {
      listTicket = await this.ticketsRepository.findById(ticket_id);

      console.log('A query foi feita no banco');

      await this.cacheProvider.save(`ticketList:${ticket_id}`, listTicket);
    }

    return listTicket;
  }
}

export default CreateTicketService;
