import { getRepository, Repository } from 'typeorm';

import IRolesRepository from '@modules/users/repositories/IRolesRepository';
import ICreateRoleDTO from '@modules/users/dtos/ICreateRoleDTO';

import Role from '@modules/users/infra/typeorm/entities/Role';
import Permission from '@modules/users/infra/typeorm/entities/Permission';

class RolesRepository implements IRolesRepository {
  private ormRepository: Repository<Role>;

  private ormRepositoryPermission: Repository<Permission>;

  constructor() {
    this.ormRepository = getRepository(Role);

    this.ormRepositoryPermission = getRepository(Permission);
  }

  public async findAllRoles(): Promise<Role[]> {
    const findAllRoles = await this.ormRepository.find();

    return findAllRoles;
  }

  public async findById(role_id: Role[]): Promise<string | undefined> {
    const parseRoleId = role_id.toString();

    const findRole = await this.ormRepository.find({
      where: { id: parseRoleId },
    });

    const roleName = findRole.map(role => role.name);

    return roleName.toString();
  }

  public async findByName(name: string): Promise<string | undefined> {
    const findRoleName = await this.ormRepository.find({ name });

    const roleName = findRoleName.map(role => role.name);

    return roleName.toString();
  }

  public async create({
    name,
    description,
    permissions,
  }: ICreateRoleDTO): Promise<Role> {
    const existsPermission = await this.ormRepositoryPermission.findByIds(
      permissions,
    );

    const role = this.ormRepository.create({
      name,
      description,
      permissions: existsPermission,
    });

    await this.ormRepository.save(role);

    return role;
  }

  public async save(role: Role): Promise<Role> {
    return this.ormRepository.save(role);
  }

  public async delete(role: Role): Promise<void> {
    await this.ormRepository.delete(role);
  }
}

export default RolesRepository;
