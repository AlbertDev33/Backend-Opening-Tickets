import { uuid } from 'uuidv4';

import IPermissionsRepository from '@modules/users/repositories/IPermissionsRepository';
import ICreatePermissionDTO from '@modules/users/dtos/ICreatePermissionDTO';

import Permission from '@modules/users/infra/typeorm/entities/Permission';

class FakePermissionsRepository implements IPermissionsRepository {
  private permission: Permission[] = [];

  public async findById(id: string): Promise<Permission | undefined> {
    const findPermission = this.permission.find(user => user.id === id);

    return findPermission;
  }

  public async findByName(name: string): Promise<Permission | undefined> {
    const findPermission = this.permission.find(
      permissionName => permissionName.name === name,
    );

    return findPermission;
  }

  public async create(
    permissionData: ICreatePermissionDTO,
  ): Promise<Permission> {
    const permission = new Permission();

    Object.assign(permission, { id: uuid() }, permissionData);

    this.permission.push(permission);

    return permission;
  }

  public async save(permissionData: Permission): Promise<Permission> {
    const findIndex = this.permission.findIndex(
      findPermission => findPermission.id === permissionData.id,
    );

    this.permission[findIndex] = permissionData;

    return permissionData;
  }

  public async delete(permission_id: string): Promise<void> {
    const findPermissionIndex = this.permission.findIndex(
      permissionId => permissionId.id === permission_id,
    );

    this.permission.splice(findPermissionIndex, 1);
  }
}

export default FakePermissionsRepository;
