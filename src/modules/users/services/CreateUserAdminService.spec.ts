import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeRolesRepository from '@modules/users/repositories/fakes/FakeRolesRepository';
import FakeHashProvider from '@shared/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserAdminService from '@modules/users/services/CreateUserAdminService';
import AppError from '@shared/errors/AppError';
import Role from '../infra/typeorm/entities/Role';

let fakeUsersRepository: FakeUsersRepository;
let fakeRolesRepository: FakeRolesRepository;
let fakeHashProvider: FakeHashProvider;
let createUserAdminService: CreateUserAdminService;

describe('CreateUserAdmin', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeRolesRepository = new FakeRolesRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserAdminService = new CreateUserAdminService(
      fakeUsersRepository,
      fakeRolesRepository,
      fakeHashProvider,
    );

    process.env.USER_ADMIN_ROLE = 'Role_TestAdmin';
  });

  it('should be able to create a new admin user only if the accountable is a administrator', async () => {
    const newRole = await fakeRolesRepository.create({
      name: 'Role_TestAdmin',
      description: 'role test',
      permissions: [],
    });

    const userAdmin = await fakeUsersRepository.create({
      name: 'Administrator',
      email: 'administrator@example.com',
      password: '123456',
      roles: [newRole],
    });

    await fakeUsersRepository.findRole(userAdmin.id);
    const spyRole = jest.spyOn(fakeUsersRepository, 'findRole');

    const user = await createUserAdminService.execute({
      name: 'user',
      email: 'user@example.com',
      password: '123456',
      roles_id: [newRole.id] as any,
      userAdmin_id: userAdmin.id,
    });

    expect(spyRole).toHaveBeenCalledWith(userAdmin.id);
    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with e-mail already in use', async () => {
    const newRole = await fakeRolesRepository.create({
      name: 'Role_TestAdmin',
      description: 'role test',
      permissions: [],
    });

    const userAdmin = await fakeUsersRepository.create({
      name: 'Administrator',
      email: 'administrator@example.com',
      password: '123456',
      roles: [newRole],
    });

    await fakeUsersRepository.findRole(userAdmin.id);

    const spyRole = jest.spyOn(fakeUsersRepository, 'findRole');

    await createUserAdminService.execute({
      name: 'user',
      email: 'user@example.com',
      password: '123456',
      roles_id: [newRole.id] as any,
      userAdmin_id: userAdmin.id,
    });

    await expect(
      createUserAdminService.execute({
        name: 'user',
        email: 'user@example.com',
        password: '123456',
        roles_id: [newRole.id] as any,
        userAdmin_id: userAdmin.id,
      }),
    ).rejects.toBeInstanceOf(AppError);

    expect(spyRole).toHaveBeenCalledWith(userAdmin.id);
  });

  it('should not be able to create a new administrator user if the role is not that of an administrator', async () => {
    const role = new Role();
    role.name = 'Role_TestAdmin';

    const newRole = await fakeRolesRepository.create({
      name: 'role_user',
      description: 'role test',
      permissions: [],
    });

    const userAdmin = await fakeUsersRepository.create({
      name: 'Administrator',
      email: 'administrator@example.com',
      password: '123456',
      roles: [role],
    });

    await fakeUsersRepository.findRole(userAdmin.id);
    await fakeRolesRepository.findById([newRole.id] as any);

    const spyRoleName = jest.spyOn(fakeRolesRepository, 'findById');

    await expect(
      createUserAdminService.execute({
        name: 'user',
        email: 'user@example.com',
        password: '123456',
        roles_id: newRole.name as any,
        userAdmin_id: userAdmin.id,
      }),
    ).rejects.toBeInstanceOf(AppError);

    expect(spyRoleName).toHaveBeenCalledWith(newRole.name);
  });
});
