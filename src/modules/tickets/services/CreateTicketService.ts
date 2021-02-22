import Ticket from '@modules/tickets/infra/typeorm/entities/Ticket';
import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';
import ICacheProvider from '@shared/providers/CacheProvider/models/ICacheProvider';
import IHashProvider from '@shared/providers/HashProvider/models/IHashProvider';

enum DefaultValue {
  emDia = 'Em dia',
  aberto = 'Aberto',
}

interface ITicketRequest {
  subject: string;
  message: string;
  user_id: string;
  user_role: string;
}

class CreateTicketService {
  constructor(
    private ticketsRepository: ITicketsRepository,

    private cacheProvider: ICacheProvider,

    private randomProvider: IHashProvider,
  ) {}

  public async execute({
    subject,
    message,
    user_id,
    user_role,
  }: ITicketRequest): Promise<Ticket> {
    const randonString = await this.randomProvider.generateRandom(1);

    const excludeString = '$' || '/' || '.';
    const hashData = randonString
      .split(excludeString)
      .join('')
      .slice(0, 10)
      .toString()
      .toUpperCase();

    const date = new Date();
    const ticketIdentifier = `${hashData}-${date.getFullYear()}`;

    const ticket = await this.ticketsRepository.create({
      identifier: ticketIdentifier,
      subject,
      message,
      user_id,
      user_role,
      status: DefaultValue.aberto,
      condition: DefaultValue.emDia,
    });

    await this.cacheProvider.invalidatePrefix('ticketList');
    await this.cacheProvider.invalidatePrefix('TicketOpened');

    return ticket;
  }
}

export default CreateTicketService;
