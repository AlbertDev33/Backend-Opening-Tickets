import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  constructor(
    private usersRespository: IUsersRepository,

    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const user = await this.usersRespository.findById(user_id);

    if (!user) {
      throw new AppError('User not authorized', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFileName);

    user.avatar = fileName;

    await this.usersRespository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
