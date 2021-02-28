import Ticket from '@modules/tickets/infra/typeorm/entities/Ticket';
import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/providers/CacheProvider/models/ICacheProvider';

import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
}

class CreateTicketService {
  constructor(
    private ticketsRepository: ITicketsRepository,

    private usersRepository: IUsersRepository,

    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Ticket[]> {
    let allTicketsUser = await this.cacheProvider.recover<Ticket[]>(
      `ticketList:${user_id}`,
    );

    if (!allTicketsUser) {
      const user = await this.usersRepository.findById(user_id);

      if (!user) {
        throw new AppError('User not found', 404);
      }

      allTicketsUser = await this.ticketsRepository.findAllTicketsByUser(
        user_id,
      );

      await this.cacheProvider.save(`ticketList:${user_id}`, allTicketsUser);
    }

    return allTicketsUser;
  }
}

export default CreateTicketService;
