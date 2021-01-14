import { isAfter, parseISO } from 'date-fns';

import Ticket from '@modules/tickets/infra/typeorm/entities/Ticket';
import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';
import ICacheProvider from '@shared/providers/CacheProvider/models/ICacheProvider';

import AppError from '@shared/errors/AppError';

interface IRequest {
  ticket_id: string;
  subject: string;
  message: string;
  accountable: string;
  status: 'Aberto' | 'Em andamento' | 'Concluído';
  condition: string;
  conclusion?: string;
}

class AdminUpdateTicketService {
  constructor(
    private ticketsRepository: ITicketsRepository,

    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    ticket_id,
    subject,
    message,
    accountable,
    status,
    condition,
    conclusion,
  }: IRequest): Promise<Ticket> {
    const ticket = await this.ticketsRepository.findById(ticket_id);

    if (!ticket) {
      throw new AppError('Ticket not found');
    }

    if (conclusion) {
      const parseConclusionDate = parseISO(conclusion);

      if (isAfter(parseConclusionDate, Date.now())) {
        throw new AppError(
          "You can't finished a ticket with a date after today",
          400,
        );
      }

      if (status === 'Aberto' || status === 'Em andamento') {
        throw new AppError('Incorrect status', 406);
      }

      ticket.conclusion = parseConclusionDate;

      await this.ticketsRepository.save(ticket);
    } else if (status === 'Concluído') {
      throw new AppError(
        'The ticket cannot be updated with conclusion status! Insert a date of conclusion!',
        406,
      );
    }

    if (status === 'Aberto') {
      throw new AppError('The status should be Em andamento', 406);
    }

    ticket.subject = subject;
    ticket.message = message;
    ticket.status = status;
    ticket.condition = condition;
    ticket.accountable = accountable;

    const ticketUpdate = await this.ticketsRepository.save(ticket);

    await this.cacheProvider.invalidatePrefix('ticketList');

    return ticketUpdate;
  }
}

export default AdminUpdateTicketService;
