import Permission from '@modules/users/infra/typeorm/entities/Permission';
import IPermissionsRepository from '@modules/users/repositories/IPermissionsRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  description: string;
}

class CreatePermissionService {
  constructor(private permissionRepository: IPermissionsRepository) {}

  public async execute({ name, description }: IRequest): Promise<Permission> {
    const permissionExists = await this.permissionRepository.findByName(name);

    if (permissionExists) {
      throw new AppError('Permission already exists!');
    }

    const permission = await this.permissionRepository.create({
      name,
      description,
    });

    return permission;
  }
}

export default CreatePermissionService;
