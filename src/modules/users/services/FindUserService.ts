import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

class FindUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError(
        'User does not exist. Log in to the app or create a user',
      );
    }

    return user;
  }
}

export default FindUserService;
