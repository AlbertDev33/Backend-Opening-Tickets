import Ticket from '@modules/tickets/infra/typeorm/entities/Ticket';
import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';
import ICachProvider from '@shared/providers/CacheProvider/models/ICacheProvider';

class ListAllOpenedTicketsService {
  constructor(
    private ticketRepository: ITicketsRepository,

    private cacheProvider: ICachProvider,
  ) {}

  public async execute(): Promise<Ticket[] | null> {
    let listAllOpenedTickets = await this.cacheProvider.recover<Ticket[]>(
      `TicketOpened:`,
    );

    if (!listAllOpenedTickets) {
      listAllOpenedTickets = await this.ticketRepository.findAllOpenedTickets();

      await this.cacheProvider.save(`TicketOpened:`, listAllOpenedTickets);
    }

    return listAllOpenedTickets;
  }
}

export default ListAllOpenedTicketsService;
