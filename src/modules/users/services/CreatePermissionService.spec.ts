import FakePermissionRepository from '@modules/users/repositories/fakes/FakePermissionRepository';
import CreatePermissionService from '@modules/users/services/CreatePermissionService';
import AppError from '@shared/errors/AppError';

let fakePermissionRepository: FakePermissionRepository;
let createPermission: CreatePermissionService;

describe('CreatePermission', () => {
  beforeEach(() => {
    fakePermissionRepository = new FakePermissionRepository();

    createPermission = new CreatePermissionService(fakePermissionRepository);
  });

  it('should be able to create a new permission', async () => {
    const permission = await createPermission.execute({
      name: 'Permission Test',
      description: 'Create Permission Test',
    });

    expect(permission).toHaveProperty('id');
  });

  it('should no be able to create a permission that already exists', async () => {
    await createPermission.execute({
      name: 'Permission Test',
      description: 'Create Permission Test',
    });

    await expect(
      createPermission.execute({
        name: 'Permission Test',
        description: 'Create Permission Test',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
