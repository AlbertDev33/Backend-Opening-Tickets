import FakeCacheProvider from '@shared/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeHashProvider from '@shared/providers/HashProvider/fakes/FakeHashProvider';
import FakeTicketsRepository from '@modules/tickets/repositories/fakes/FakeTicketsRepository';

import CreateTicketService from '@modules/tickets/services/CreateTicketService';

let fakeCacheProvider: FakeCacheProvider;
let fakeHashProvider: FakeHashProvider;
let fakeTicketsRepository: FakeTicketsRepository;
let createTicketService: CreateTicketService;

describe('CreateTicket', () => {
  beforeAll(() => {
    fakeTicketsRepository = new FakeTicketsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    fakeHashProvider = new FakeHashProvider();

    createTicketService = new CreateTicketService(
      fakeTicketsRepository,
      fakeCacheProvider,
      fakeHashProvider,
    );
  });

  it('should be able to create a new ticket', async () => {
    const createTicket = await createTicketService.execute({
      message: 'Ticket Test',
      subject: 'Create Ticket for Test',
      user_id: 'fake_userId',
      user_role: 'fake_user_role',
    });

    expect(createTicket).toHaveProperty('id');
  });
});
