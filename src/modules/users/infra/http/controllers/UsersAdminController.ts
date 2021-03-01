import { classToClass } from 'class-transformer';

import {
  HttpRequest,
  IRequest,
  IResponse,
} from '@shared/infra/http/ExpressImplementation/HttpRequest';

import CreateUserAdminService from '@modules/users/services/CreateUserAdminService';
import RolesRepository from '@modules/users/infra/typeorm/repositories/RolesRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import BCryptHashProvider from '@shared/providers/HashProvider/implementations/BCryptHashProvider';

export default class UsersAdminController extends HttpRequest {
  public async create(
    request: IRequest,
    response: IResponse,
  ): Promise<IResponse> {
    const { id } = request.user;
    const { name, email, password, roles } = request.body;

    const usersRepository = new UsersRepository();
    const rolesReponsitory = new RolesRepository();
    const bcryptHashProvider = new BCryptHashProvider();

    const createUserAdmin = new CreateUserAdminService(
      usersRepository,
      rolesReponsitory,
      bcryptHashProvider,
    );

    const userAdmin = await createUserAdmin.execute({
      userAdmin_id: id,
      name,
      email,
      password,
      roles_id: roles,
    });

    return response.json({ userAdmin: classToClass(userAdmin) });
  }
}
