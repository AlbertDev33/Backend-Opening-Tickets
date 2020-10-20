import Ticket from '@modules/tickets/infra/typeorm/entities/Ticket';
import ICreateTicketDTO from '@modules/tickets/dtos/ICreateTicketDTO';

export default interface ITicketRepository {
  create(data: ICreateTicketDTO): Promise<Ticket>;
  findById(id: string): Promise<Ticket | undefined>;
}
