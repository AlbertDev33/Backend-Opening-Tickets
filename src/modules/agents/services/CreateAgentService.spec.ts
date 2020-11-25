import FakeAgentRepository from '@modules/agents/repositories/fakes/FakeAgentsRepository';
import CreateAgentService from '@modules/agents/services/CreateAgentService';
import FakeHashProvider from '@shared/providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppError';

describe('CreateAgent', () => {
  it('Should be able to create a new agent', async () => {
    const fakeAgentRepository = new FakeAgentRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createAgent = new CreateAgentService(
      fakeAgentRepository,
      fakeHashProvider,
    );

    const agent = await createAgent.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    expect(agent).toHaveProperty('id');
  });
  it('Should not be able to create a new agent with same e-mail', async () => {
    const fakeAgentRepository = new FakeAgentRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createAgent = new CreateAgentService(
      fakeAgentRepository,
      fakeHashProvider,
    );

    await createAgent.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    expect(
      createAgent.execute({
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
