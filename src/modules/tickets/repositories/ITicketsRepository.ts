import Ticket from '@modules/tickets/infra/typeorm/entities/Ticket';
import ICreateTicketDTO from '@modules/tickets/dtos/ICreateTicketDTO';

export default interface ITicketRepository {
  create(data: ICreateTicketDTO): Promise<Ticket>;
  delete(id: string): Promise<void>;
  update(ticket: Ticket): Promise<Ticket>;
  findById(ticket_id: string): Promise<Ticket | null>;
  findAllTickets(user_id: string): Promise<Ticket[]>;
}
