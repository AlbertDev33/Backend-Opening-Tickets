import { classToClass } from 'class-transformer';

import {
  HttpRequest,
  IRequest,
  IResponse,
} from '@shared/infra/http/ExpressImplementation/HttpRequest';

import SessionsUserService from '@modules/users/services/SessionsUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import BCryptHashProvider from '@shared/providers/HashProvider/implementations/BCryptHashProvider';

export default class SessionsController extends HttpRequest {
  public async create(
    request: IRequest,
    response: IResponse,
  ): Promise<IResponse> {
    const { email, password } = request.body;

    const usersRepository = new UsersRepository();
    const hashProvider = new BCryptHashProvider();

    const sesssionUser = new SessionsUserService(usersRepository, hashProvider);

    const { user, token } = await sesssionUser.execute({
      email,
      password,
    });

    return response.json({ user: classToClass(user), token });
  }
}
