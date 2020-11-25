import { Request, Response } from 'express';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import BCryptHashProvider from '@shared/providers/HashProvider/implementations/BCryptHashProvider';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;

    const usersRepository = new UsersRepository();
    const userTokensRepository = new UserTokensRepository();
    const bcryptHashProvider = new BCryptHashProvider();

    const resetPassword = new ResetPasswordService(
      usersRepository,
      userTokensRepository,
      bcryptHashProvider,
    );

    await resetPassword.execute({
      token,
      password,
    });

    return response.status(204).json();
  }
}
