import {
  HttpRequest,
  IRequest,
  IResponse,
} from '@shared/infra/http/ExpressImplementation/HttpRequest';

import CreateRoleService from '@modules/users/services/CreateRoleService';
import RolesRepository from '@modules/users/infra/typeorm/repositories/RolesRepository';
import RedisCacheProvider from '@shared/providers/CacheProvider/implementations/RedisCacheProvider';

export default class PermissionsController extends HttpRequest {
  public async create(
    request: IRequest,
    response: IResponse,
  ): Promise<IResponse> {
    const { name, description, permissions } = request.body;

    const roleReponsitory = new RolesRepository();
    const redisCacheProvider = new RedisCacheProvider();

    const createRole = new CreateRoleService(
      roleReponsitory,
      redisCacheProvider,
    );

    const permission = await createRole.execute({
      name,
      description,
      permissions,
    });

    return response.status(200).json(permission);
  }
}
