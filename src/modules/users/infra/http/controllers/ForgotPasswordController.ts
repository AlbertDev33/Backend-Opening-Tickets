import { Request, Response } from 'express';

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import EtherealMailProvider from '@shared/providers/MailProvider/implementations/EtherealMailProvider';
import SESMailProvider from '@shared/providers/MailProvider/implementations/SESMailProvider';
import HandlebarsMailTemplateProvider from '@shared/providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

import mailConfig from '@config/mail';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const usersRepository = new UsersRepository();
    const handlebarsMailTemplate = new HandlebarsMailTemplateProvider();
    const etherealMailProvider = new EtherealMailProvider(
      handlebarsMailTemplate,
    );
    const sesMailProvider = new SESMailProvider(handlebarsMailTemplate);

    const userTokensRepository = new UserTokensRepository();

    const driverMail =
      mailConfig.driver === 'ethereal' ? etherealMailProvider : sesMailProvider;

    const sesssionUser = new SendForgotPasswordEmailService(
      usersRepository,
      driverMail,
      userTokensRepository,
    );

    await sesssionUser.execute({
      email,
    });

    return response.status(204).json();
  }
}
