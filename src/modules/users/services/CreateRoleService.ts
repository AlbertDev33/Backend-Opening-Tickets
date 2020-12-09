import AppError from '@shared/errors/AppError';

import Role from '@modules/users/infra/typeorm/entities/Role';
import IRolesRepository from '@modules/users/repositories/IRolesRepository';
import Permission from '../infra/typeorm/entities/Permission';

interface IRequest {
  name: string;
  description: string;
  permissions: Permission[];
}

class CreateRoleService {
  constructor(private roleRepository: IRolesRepository) {}

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

    return role;
  }
}

export default CreateRoleService;
