import Role from '@modules/users/infra/typeorm/entities/Role';
import IRolesRepository from '@modules/users/repositories/IRolesRepository';

import AppError from 'shared/errors/AppError';

interface IRequest {
  roleName: string;
}

class ListUserRoleService {
  constructor(private roleRepository: IRolesRepository) {}

  public async execute({ roleName }: IRequest): Promise<string | null> {
    const userRoles = await this.roleRepository.findByName(roleName);

    if (!userRoles) {
      throw new AppError('Role not found', 404);
    }

    return userRoles;
  }
}

export default ListUserRoleService;
