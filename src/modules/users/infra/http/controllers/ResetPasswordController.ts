import {
  HttpRequest,
  IRequest,
  IResponse,
} from '@shared/infra/http/ExpressImplementation/HttpRequest';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import BCryptHashProvider from '@shared/providers/HashProvider/implementations/BCryptHashProvider';

export default class ResetPasswordController extends HttpRequest {
  public async create(
    request: IRequest,
    response: IResponse,
  ): Promise<IResponse> {
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
