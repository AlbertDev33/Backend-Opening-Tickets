import AppError from '@shared/errors/AppError';

import IMailProvider from '@shared/providers/models/IMailProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

// import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  constructor(
    private usersRepository: IUsersRepository,

    private mailProvider: IMailProvider,

    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    await this.userTokensRepository.generate(user.id);

    this.mailProvider.sendMail(
      email,
      'Pedido de recuperação de senha recebido.',
    );
  }
}

export default SendForgotPasswordEmailService;
