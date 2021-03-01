import {
  HttpRequest,
  IRequest,
  IResponse,
} from '@shared/infra/http/ExpressImplementation/HttpRequest';

import CreatePermissionService from '@modules/users/services/CreatePermissionService';
import PermissionsRepository from '@modules/users/infra/typeorm/repositories/PermissionsRepository';

export default class PermissionsController extends HttpRequest {
  public async create(
    request: IRequest,
    response: IResponse,
  ): Promise<IResponse> {
    const { name, description } = request.body;

    const permissionReponsitory = new PermissionsRepository();
    const createPermission = new CreatePermissionService(permissionReponsitory);

    const permission = await createPermission.execute({
      name,
      description,
    });

    return response.status(200).json(permission);
  }
}
