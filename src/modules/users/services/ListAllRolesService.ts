import Role from '@modules/users/infra/typeorm/entities/Role';
import IRolesRepository from '@modules/users/repositories/IRolesRepository';

class ListAllRoleService {
  constructor(private roleRepository: IRolesRepository) {}

  public async execute(): Promise<Role[]> {
    const userRoles = await this.roleRepository.findAllRoles();

    return userRoles;
  }
}

export default ListAllRoleService;
