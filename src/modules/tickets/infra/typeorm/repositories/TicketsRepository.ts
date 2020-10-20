import { getRepository, Repository, EntityRepository } from 'typeorm';

import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';
import ICreateTicketDTO from '@modules/tickets/dtos/ICreateTicketDTO';

import Ticket from '@modules/tickets/infra/typeorm/entities/Ticket';

@EntityRepository(Ticket)
class TicketsRepository implements ITicketsRepository {
  private ormRepository: Repository<Ticket>;

  constructor() {
    this.ormRepository = getRepository(Ticket);
  }

  public async findById(id: string): Promise<Ticket | undefined> {
    const findTicket = await this.ormRepository.findOne(id);

    return findTicket;
  }

  public async create({
    subject,
    message,
    user_id,
  }: ICreateTicketDTO): Promise<Ticket> {
    const ticket = this.ormRepository.create({ subject, message, user_id });

    await this.ormRepository.save(ticket);

    return ticket;
  }
}

export default TicketsRepository;
