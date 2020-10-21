import { getCustomRepository } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

class FindUserService {
  public async execute({ id }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(id);

    if (!user) {
      throw new AppError(
        'User does not exist. Log in to the app or create a user',
      );
    }

    return user;
  }
}

export default FindUserService;
