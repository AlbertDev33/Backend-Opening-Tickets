import Ticket from '@modules/tickets/infra/typeorm/entities/Ticket';
import ICreateTicketDTO from '@modules/tickets/dtos/ICreateTicketDTO';
import IUpdateTicketDTO from '@modules/tickets/dtos/IUpdateTicketDTO';

export default interface ITicketRepository {
  create(data: ICreateTicketDTO): Promise<Ticket>;
  delete(id: string): Promise<void>;
  save(ticket: IUpdateTicketDTO): Promise<Ticket>;
  findById(ticket_id: string): Promise<Ticket | undefined>;
  findUserByTicket(user_id: string): Promise<Ticket | undefined>;
  findAllTicketsByUser(user_id: string): Promise<Ticket[]>;
  findAllTicketsByAccountable(accountable_id: string): Promise<Ticket[]>;
  findAllOpenedTickets(): Promise<Ticket[]>;
}
