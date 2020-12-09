import { Request, Response } from 'express';

import CreateRoleService from '@modules/users/services/CreateRoleService';
import RolesRepository from '@modules/users/infra/typeorm/repositories/RolesRepository';

export default class PermissionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, permissions } = request.body;

    const roleReponsitory = new RolesRepository();
    const createRole = new CreateRoleService(roleReponsitory);

    const permission = await createRole.execute({
      name,
      description,
      permissions,
    });

    return response.status(200).json(permission);
  }
}
