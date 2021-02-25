import FakeRoleRepository from '@modules/users/repositories/fakes/FakeRolesRepository';
import FakeCacheProvider from '@shared/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateRoleService from '@modules/users/services/CreateRoleService';
import AppError from '@shared/errors/AppError';

let fakeRoleRepository: FakeRoleRepository;
let fakeCacheProvider: FakeCacheProvider;
let createRoleService: CreateRoleService;

describe('CreateRole', () => {
  beforeEach(() => {
    fakeRoleRepository = new FakeRoleRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createRoleService = new CreateRoleService(
      fakeRoleRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a role', async () => {
    const role = await createRoleService.execute({
      name: 'Role Test',
      description: 'Create Role Test',
      permissions: [],
    });

    expect(role).toHaveProperty('id');
  });

  it('should no be able to create a role that already exists', async () => {
    await createRoleService.execute({
      name: 'Role Test',
      description: 'Create Role Test',
      permissions: [],
    });

    await expect(
      createRoleService.execute({
        name: 'Role Test',
        description: 'Create Role Test',
        permissions: [],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
