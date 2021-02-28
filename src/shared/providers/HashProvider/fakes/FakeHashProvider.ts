import IHashProvider from '@shared/providers/HashProvider/models/IHashProvider';

export default class FakeHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return payload;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }

  public async generateRandom(random: number): Promise<string> {
    return `${String(random)}789sadf`;
  }
}
