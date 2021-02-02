import ICreateRoleDTO from '@modules/users/dtos/ICreateRoleDTO';
import Role from '@modules/users/infra/typeorm/entities/Role';

export default interface IRolesRepository {
  create(data: ICreateRoleDTO): Promise<Role>;
  save(role: Role): Promise<Role>;
  delete(role: Role): Promise<void>;
  findByName(name: Role[]): Promise<string[] | undefined>;
  findById(id: string[]): Promise<Role[]>;
}
