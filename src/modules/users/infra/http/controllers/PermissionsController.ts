import { Request, Response } from 'express';

import CreatePermissionService from '@modules/users/services/CreatePermissionService';
import PermissionsRepository from '@modules/users/infra/typeorm/repositories/PermissionsRepository';

export default class PermissionsController {
  public async create(request: Request, response: Response): Promise<Response> {
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
