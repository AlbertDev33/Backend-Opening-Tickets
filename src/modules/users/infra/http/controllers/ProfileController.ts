import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import HashProvider from '@shared/providers/HashProvider/implementations/BCryptHashProvider';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const usersRepository = new UsersRepository();
    const showProfile = new ShowProfileService(usersRepository);

    const user = await showProfile.execute({
      user_id,
    });

    return response.json({ user: classToClass(user) });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, old_password, password } = request.body;

    const userReponsitory = new UsersRepository();
    const hashProvider = new HashProvider();
    const updateProfile = new UpdateProfileService(
      userReponsitory,
      hashProvider,
    );

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      old_password,
      password,
    });

    return response.json(user);
  }
}
