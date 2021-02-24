import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeRolesRepository from '@modules/users/repositories/fakes/FakeRolesRepository';
import CreateUserAdminService from '@modules/users/services/CreateUserAdminService';
import AppError from '@shared/errors/AppError';
import Role from '../infra/typeorm/entities/Role';

let fakeUsersRepository: FakeUsersRepository;
let fakeRolesRepository: FakeRolesRepository;
let createUserAdminService: CreateUserAdminService;

describe('CreateUserAdmin', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeRolesRepository = new FakeRolesRepository();

    createUserAdminService = new CreateUserAdminService(
      fakeUsersRepository,
      fakeRolesRepository,
    );
  });

  it('should be able to create a new admin user only if the accountable is a administrator', async () => {
    const role = new Role();
    role.name = 'role_admin';

    const userAdmin = await fakeUsersRepository.create({
      name: 'Administrator',
      email: 'administrator@example.com',
      password: '123456',
      roles: [role],
    });

    const { id } = userAdmin;

    await fakeUsersRepository.findRole(id);
    const spyRole = jest.spyOn(fakeUsersRepository, 'findRole');

    const user = await createUserAdminService.execute({
      name: 'user',
      email: 'user@example.com',
      password: '123456',
      roles_id: [],
      userAdmin_id: id,
    });

    expect(spyRole).toHaveBeenCalledWith(id);
    expect(user).toHaveProperty('id');
  });
});
