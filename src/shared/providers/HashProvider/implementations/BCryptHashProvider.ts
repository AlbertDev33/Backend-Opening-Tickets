import { hash, compare } from 'bcrypt';

import IHashProvider from '@shared/providers/HashProvider/models/IHashProvider';

export default class BCryptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 10);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
