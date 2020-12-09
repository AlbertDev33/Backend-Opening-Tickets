import ICreatePermissionDTO from '@modules/users/dtos/ICreatePermissionDTO';
import Permission from '@modules/users/infra/typeorm/entities/Permission';

export default interface IPermissionsRepository {
  create(data: ICreatePermissionDTO): Promise<Permission>;
  save(permission: Permission): Promise<Permission>;
  delete(permission: Permission): Promise<void>;
  findByName(name: string): Promise<Permission | undefined>;
  findById(id: string): Promise<Permission | undefined>;
}
