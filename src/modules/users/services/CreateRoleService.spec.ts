import FakeRoleRepository from '@modules/users/repositories/fakes/FakeRolesRepository';
import CreateRoleService from '@modules/users/services/CreateRoleService';

let fakeRoleRepository: FakeRoleRepository;
let createRoleService: CreateRoleService;

describe('CreateRole', () => {
  beforeEach(() => {
    fakeRoleRepository = new FakeRoleRepository();

    createRoleService = new CreateRoleService(fakeRoleRepository);
  });

  it('should be able to create a role', async () => {
    const role = await createRoleService.execute({
      name: 'Role Test',
      description: 'Create Role Test',
      permissions: [],
    });

    expect(role).toHaveProperty('id');
  });
});
