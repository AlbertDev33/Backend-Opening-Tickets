import { getCustomRepository } from 'typeorm';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import User from '@modules/users/infra/typeorm/entities/User';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class SessionsUserService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Invalid email or password');
    }

    const token = sign({}, '24fb09552755f49d35e8f15944fec9f1', {
      subject: user.id,
      expiresIn: '8h',
    });

    return { user, token };
  }
}

export default SessionsUserService;
