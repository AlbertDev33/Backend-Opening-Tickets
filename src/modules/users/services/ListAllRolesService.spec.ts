import FakeRolesRepository from '@modules/users/repositories/fakes/FakeRolesRepository';
import ListAllRoleService from '@modules/users/services/ListAllRolesService';

let fakeRolesRepository: FakeRolesRepository;
let listAllRoles: ListAllRoleService;

describe('ListRoles', () => {
  beforeEach(() => {
    fakeRolesRepository = new FakeRolesRepository();

    listAllRoles = new ListAllRoleService(fakeRolesRepository);
  });

  it('should be able to list the roles', async () => {
    const userRoles = await fakeRolesRepository.create({
      name: 'user_role',
      description: 'role_user',
      permissions: [],
    });

    const roles = await listAllRoles.execute();

    expect(roles).toEqual([userRoles]);
  });
});
