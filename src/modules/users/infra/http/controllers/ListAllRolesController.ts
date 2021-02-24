import { Request, Response } from 'express';

import ListAllRolesService from '@modules/users/services/ListAllRolesService';
import RolesRepository from '@modules/users/infra/typeorm/repositories/RolesRepository';

export default class ListAllRoleController {
  public async index(request: Request, response: Response): Promise<Response> {
    const rolesRepository = new RolesRepository();
    const listAllRolesService = new ListAllRolesService(rolesRepository);

    const listAllRoles = await listAllRolesService.execute();

    return response.json(listAllRoles);
  }
}
