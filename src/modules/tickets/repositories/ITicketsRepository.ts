import Ticket from '@modules/tickets/infra/typeorm/entities/Ticket';
import ICreateTicketDTO from '@modules/tickets/dtos/ICreateTicketDTO';

export default interface ITicketRepository {
  create(data: ICreateTicketDTO): Promise<Ticket>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Ticket | undefined>;
  findAllTickets(): Promise<Ticket[]>;
}
