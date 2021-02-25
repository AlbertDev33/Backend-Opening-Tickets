import AppError from '@shared/errors/AppError';

import Role from '@modules/users/infra/typeorm/entities/Role';
import IRolesRepository from '@modules/users/repositories/IRolesRepository';
import ICacheProvider from '@shared/providers/CacheProvider/implementations/RedisCacheProvider';
import Permission from '../infra/typeorm/entities/Permission';

interface IRequest {
  name: string;
  description: string;
  permissions: Permission[];
}

class CreateRoleService {
  constructor(
    private roleRepository: IRolesRepository,

    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    description,
    permissions,
  }: IRequest): Promise<Role> {
    const roleExists = await this.roleRepository.findByName(name);

    if (roleExists) {
      throw new AppError('Role already exists!');
    }

    const role = await this.roleRepository.create({
      name,
      description,
      permissions,
    });

    await this.cacheProvider.invalidatePrefix('userRole');

    return role;
  }
}

export default CreateRoleService;
