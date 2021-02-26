import { getRepository, Repository, EntityRepository, IsNull } from 'typeorm';

import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';
import ICreateTicketDTO from '@modules/tickets/dtos/ICreateTicketDTO';

import Ticket from '@modules/tickets/infra/typeorm/entities/Ticket';

@EntityRepository(Ticket)
class TicketsRepository implements ITicketsRepository {
  private ormRepository: Repository<Ticket>;

  constructor() {
    this.ormRepository = getRepository(Ticket);
  }

  public async findAllTicketsByAccountable(
    accountable_id: string,
  ): Promise<Ticket[]> {
    const tickets = await this.ormRepository.find({
      where: { accountable: accountable_id },
    });

    return tickets;
  }

  public async findAllTicketsByUser(user_id: string): Promise<Ticket[]> {
    const tickets = await this.ormRepository.find({
      where: { user_id },
    });

    return tickets;
  }

  public async findById(ticket_id: string): Promise<Ticket | undefined> {
    const findTicket = await this.ormRepository.findOne({
      where: { id: ticket_id },
    });

    return findTicket;
  }

  public async findUserByTicket(user_id: string): Promise<Ticket | undefined> {
    const findUserByTicket = await this.ormRepository.findOne({
      where: { user_id },
    });

    return findUserByTicket;
  }

  public async findAllOpenedTickets(): Promise<Ticket[]> {
    const findTickets = await this.ormRepository.find({
      where: { accountable: IsNull() },
    });

    return findTickets;
  }

  public async create({
    identifier,
    subject,
    message,
    user_id,
    user_role,
    status,
    condition,
  }: ICreateTicketDTO): Promise<Ticket> {
    const ticket = this.ormRepository.create({
      identifier,
      subject,
      message,
      user_id,
      user_role,
      status,
      condition,
    });

    await this.ormRepository.save(ticket);

    return ticket;
  }

  public async save(ticket: Ticket): Promise<Ticket> {
    return this.ormRepository.save(ticket);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default TicketsRepository;
