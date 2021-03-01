import {
  HttpRequest,
  IRequest,
  IResponse,
} from '@shared/infra/http/ExpressImplementation/HttpRequest';

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import EtherealMailProvider from '@shared/providers/MailProvider/implementations/EtherealMailProvider';
import SESMailProvider from '@shared/providers/MailProvider/implementations/SESMailProvider';
import HandlebarsMailTemplateProvider from '@shared/providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

import mailConfig from '@config/mail';

export default class ForgotPasswordController extends HttpRequest {
  public async create(
    request: IRequest,
    response: IResponse,
  ): Promise<IResponse> {
    const { email } = request.body;

    const usersRepository = new UsersRepository();
    const handlebarsMailTemplate = new HandlebarsMailTemplateProvider();
    const sesMailProvider = new SESMailProvider(handlebarsMailTemplate);

    const userTokensRepository = new UserTokensRepository();

    const driverMail =
      mailConfig.driver === 'ethereal' ? EtherealMailProvider : sesMailProvider;

    const sendForgotEmail = new SendForgotPasswordEmailService(
      usersRepository,
      driverMail,
      userTokensRepository,
    );

    await sendForgotEmail.execute({
      email,
    });

    return response.status(204).json();
  }
}
