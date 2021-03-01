import {
  HttpRequest,
  IRequest,
  IResponse,
} from '@shared/infra/http/ExpressImplementation/HttpRequest';

import ListAllRolesService from '@modules/users/services/ListAllRolesService';
import RolesRepository from '@modules/users/infra/typeorm/repositories/RolesRepository';

export default class ListAllRoleController extends HttpRequest {
  public async index(
    request: IRequest,
    response: IResponse,
  ): Promise<IResponse> {
    const rolesRepository = new RolesRepository();
    const listAllRolesService = new ListAllRolesService(rolesRepository);

    const listAllRoles = await listAllRolesService.execute();

    return response.json(listAllRoles);
  }
}
