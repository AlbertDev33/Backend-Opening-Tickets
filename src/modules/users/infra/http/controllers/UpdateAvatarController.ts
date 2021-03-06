import { classToClass } from 'class-transformer';

import {
  HttpRequest,
  IRequest,
  IResponse,
} from '@shared/infra/http/ExpressImplementation/HttpRequest';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import DiskStorageProvider from '@shared/providers/StorageProvider/implementations/DiskStorageProvider';
import S3StorageProvider from '@shared/providers/StorageProvider/implementations/S3StorageProvider';

import uploadConfig from '@config/upload';

export default class UpdateAvatarController extends HttpRequest {
  public async update(
    request: IRequest,
    response: IResponse,
  ): Promise<IResponse> {
    const user_id = request.user.id;
    const avatarFileName = request.file.filename;

    const userRepository = new UsersRepository();
    const diskStorageProvider = new DiskStorageProvider();
    const s3StorageProvider = new S3StorageProvider();

    const storageProvider =
      uploadConfig.driver === 's3' ? s3StorageProvider : diskStorageProvider;

    const updateUserAvatar = new UpdateUserAvatarService(
      userRepository,
      storageProvider,
    );

    const updateAvatar = await updateUserAvatar.execute({
      user_id,
      avatarFileName,
    });

    return response.json({ updateAvatar: classToClass(updateAvatar) });
  }
}
