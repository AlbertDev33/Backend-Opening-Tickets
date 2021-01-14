import { Request, Response } from 'express';
import { decode } from 'jsonwebtoken';

import CreateRoleService from '@modules/users/services/CreateRoleService';
import ListUserRoleService from '@modules/users/services/ListUserRoleService';
import RolesRepository from '@modules/users/infra/typeorm/repositories/RolesRepository';
import RedisCacheProvider from '@shared/providers/CacheProvider/implementations/RedisCacheProvider';

import AppError from '@shared/errors/AppError';

interface IRoleName {
  userRoles?: string;
}

export default class PermissionsController {
  public async create(request: Request, response: Response): Promise<Response> {
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

  public async index(request: Request, response: Response): Promise<Response> {
    const { token } = request.params;

    if (!token) {
      throw new AppError('JWT token is missing', 401);
    }

    const decoded = decode(token);
    const { userRoles } = decoded as IRoleName;

    if (!userRoles) {
      throw new AppError('Role not found!', 404);
    }

    const roleRepository = new RolesRepository();

    const listUserRole = new ListUserRoleService(roleRepository);

    await listUserRole.execute({ roleName: userRoles });

    return response.status(200).json(userRoles);
  }
}
