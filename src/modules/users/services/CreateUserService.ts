import User from '@modules/users/infra/typeorm/entities/User';
import Role from '@modules/users/infra/typeorm/entities/Role';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@shared/providers/HashProvider/models/IHashProvider';

import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  email: string;
  password: string;
  roles: Role[];
}

class CreateUserService {
  constructor(
    private usersRepository: IUsersRepository,

    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
    roles,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      roles,
    });

    return user;
  }
}

export default CreateUserService;
