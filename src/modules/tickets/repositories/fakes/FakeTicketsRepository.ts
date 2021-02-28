import { uuid } from 'uuidv4';

import Ticket from '@modules/tickets/infra/typeorm/entities/Ticket';

import IUpdateTicketDTO from '@modules/tickets/dtos/IUpdateTicketDTO';
import ICreateTicketDTO from '@modules/tickets/dtos/ICreateTicketDTO';
import ITicketsRepository from '../ITicketsRepository';

class FakeTicketsRepository implements ITicketsRepository {
  private tickets: Ticket[] = [];

  public async create(data: ICreateTicketDTO): Promise<Ticket> {
    const ticket = new Ticket();

    Object.assign(ticket, { id: uuid() }, data);

    this.tickets.push(ticket);

    return ticket;
  }

  public async delete(id: string): Promise<void> {
    const findTicketIndex = this.tickets.findIndex(
      ticketIndex => ticketIndex.id === id,
    );

    this.tickets.splice(findTicketIndex, 1);
  }

  public async save(ticket: IUpdateTicketDTO): Promise<Ticket> {
    const ticketData = new Ticket();

    const ticketSave = ticket as Ticket;

    this.tickets.push(ticketSave);

    return ticketData;
  }

  public async findById(ticket_id: string): Promise<Ticket | undefined> {
    const findTicket = this.tickets.find(ticket => ticket.id === ticket_id);

    return findTicket;
  }

  public async findUserByTicket(user_id: string): Promise<Ticket | undefined> {
    const findUserTicket = this.tickets.find(
      userTicket => userTicket.user_id === user_id,
    );

    return findUserTicket;
  }

  public async findAllTicketsByUser(user_id: string): Promise<Ticket[]> {
    const findTicketByUser = this.tickets.filter(
      tickets => tickets.user_id === user_id,
    );

    return findTicketByUser;
  }

  public async findAllTicketsByAccountable(
    accountable_id: string,
  ): Promise<Ticket[]> {
    const findTicketByAccountable = this.tickets.filter(
      tickets => tickets.accountable === accountable_id,
    );

    return findTicketByAccountable;
  }

  public async findAllOpenedTickets(): Promise<Ticket[]> {
    const findOpenedTickets = this.tickets.filter(
      ticket => !ticket.accountable,
    );

    return findOpenedTickets;
  }
}

export default FakeTicketsRepository;
