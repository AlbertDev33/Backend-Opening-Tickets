import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@shared/providers/HashProvider/fakes/FakeHashProvider';
import SessionsUserService from '@modules/users/services/SessionsUserService';
import CreateUserService from '@modules/users/services/CreateUserService';

describe('SessionsUser', () => {
  it('Should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashprovider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashprovider,
    );
    const authenticateUser = new SessionsUserService(
      fakeUsersRepository,
      fakeHashprovider,
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response.user).toEqual(user);
    expect(response).toHaveProperty('token');
  });

  it('Should not be able to authenticate with non existin user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashprovider = new FakeHashProvider();

    const authenticateUser = new SessionsUserService(
      fakeUsersRepository,
      fakeHashprovider,
    );

    expect(
      authenticateUser.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashprovider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashprovider,
    );
    const authenticateUser = new SessionsUserService(
      fakeUsersRepository,
      fakeHashprovider,
    );

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(
      authenticateUser.execute({
        email: 'johndoe@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
