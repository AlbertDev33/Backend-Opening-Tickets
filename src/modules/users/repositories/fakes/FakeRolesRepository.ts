import { uuid } from 'uuidv4';

import IRolesRepository from '@modules/users/repositories/IRolesRepository';
import ICreateRoleDTO from '@modules/users/dtos/ICreateRoleDTO';

import Role from '@modules/users/infra/typeorm/entities/Role';

export default class FakeRolesRepository implements IRolesRepository {
  private roles: Role[] = [];

  public async findAllRoles(): Promise<Role[]> {
    return this.roles;
  }

  public async findById(role_id: Role[]): Promise<string | undefined> {
    const parseRoleId = role_id.toString();

    const userRole = this.roles.filter(role => role.id === parseRoleId);

    const roleName = userRole.map(name => name.name);

    return roleName.toString();
  }

  public async findByName(name: string): Promise<string | undefined> {
    const findRoleName = this.roles.find(role => role.name === name);

    const roleName = findRoleName?.name;

    return roleName;
  }

  public async create(data: ICreateRoleDTO): Promise<Role> {
    const role = new Role();

    Object.assign(role, { id: uuid() }, data);

    this.roles.push(role);

    return role;
  }

  public async save(role: Role): Promise<Role> {
    const findIndex = this.roles.findIndex(findRole => findRole.id === role.id);

    this.roles[findIndex] = role;

    return role;
  }

  public async delete(role: Role): Promise<void> {
    let { roles } = this;

    roles = this.roles.filter(findRole => findRole.id === role.id);

    roles.pop();
  }
}
