import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
}

class ShowProfileService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found!', 404);
    }

    return user;
  }
}

export default ShowProfileService;
