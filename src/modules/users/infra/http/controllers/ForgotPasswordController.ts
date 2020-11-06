import { Request, Response } from 'express';

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import EtherealMailProvider from '@shared/providers/MailProvider/implementations/EtherealMailProvider';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const usersRepository = new UsersRepository();
    const etherealMailProvider = new EtherealMailProvider();
    const userTokensRepository = new UserTokensRepository();

    const sesssionUser = new SendForgotPasswordEmailService(
      usersRepository,
      etherealMailProvider,
      userTokensRepository,
    );

    await sesssionUser.execute({
      email,
    });

    return response.status(204).json();
  }
}
