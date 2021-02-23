import FakeHashProvider from '@shared/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import AppError from '@shared/errors/AppError';

let fakeHashProvider: FakeHashProvider;
let fakeUserRepository: FakeUsersRepository;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUserRepository = new FakeUsersRepository();

    updateProfile = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update user profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
      roles: [],
    });

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Tree',
      email: 'johntree@example.com',
    });

    expect(updateUser.name).toBe('John Tree');
    expect(updateUser.email).toBe('johntree@example.com');
  });

  it('should not be able to update user profile that non-existing', async () => {
    expect(
      updateProfile.execute({
        user_id: 'non_existing_user_id',
        name: 'John Doe',
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
      roles: [],
    });

    const user = await fakeUserRepository.create({
      name: 'Test',
      email: 'test@example.com',
      password: '123456',
      roles: [],
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'john@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
      roles: [],
    });

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Tree',
      email: 'johntree@example.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updateUser.password).toBe('123123');
  });

  it('should not be able to update the password without the old_password', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
      roles: [],
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Tree',
        email: 'johntree@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old_password', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
      roles: [],
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Tree',
        email: 'johntree@example.com',
        old_password: 'wrong_old_password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
