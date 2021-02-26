import { getRepository, Repository } from 'typeorm';

import IPermissionsRepository from '@modules/users/repositories/IPermissionsRepository';
import ICreatePermissionDTO from '@modules/users/dtos/ICreatePermissionDTO';

import Permission from '@modules/users/infra/typeorm/entities/Permission';

class PermissionRepository implements IPermissionsRepository {
  private ormRepository: Repository<Permission>;

  constructor() {
    this.ormRepository = getRepository(Permission);
  }

  public async findByName(name: string): Promise<Permission | undefined> {
    const findPermission = await this.ormRepository.findOne({ name });

    return findPermission;
  }

  public async findById(id: string): Promise<Permission | undefined> {
    const findPermission = await this.ormRepository.findOne(id);

    return findPermission;
  }

  public async create({
    name,
    description,
  }: ICreatePermissionDTO): Promise<Permission> {
    const permission = this.ormRepository.create({
      name,
      description,
    });

    await this.ormRepository.save(permission);

    return permission;
  }

  public async save(permission: Permission): Promise<Permission> {
    return this.ormRepository.save(permission);
  }

  public async delete(permission_id: string): Promise<void> {
    await this.ormRepository.delete(permission_id);
  }
}

export default PermissionRepository;
