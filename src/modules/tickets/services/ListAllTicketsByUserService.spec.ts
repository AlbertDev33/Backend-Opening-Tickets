import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeTicketsRepository from '@modules/tickets/repositories/fakes/FakeTicketsRepository';
import FakeCacheProvider from '@shared/providers/CacheProvider/fakes/FakeCacheProvider';

import ListAllTicketsByUserService from '@modules/tickets/services/ListAllTicketsByUserService';
import AppError from '@shared/errors/AppError';

let fakeTickesRepository: FakeTicketsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let listAllTicketsByUserService: ListAllTicketsByUserService;

describe('ListAllTickestByUserService', () => {
  beforeAll(() => {
    fakeTickesRepository = new FakeTicketsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listAllTicketsByUserService = new ListAllTicketsByUserService(
      fakeTickesRepository,
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list all tickets a exist user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      roles: [],
    });

    const ticket = await fakeTickesRepository.create({
      identifier: '1231',
      message: 'Ticket Test',
      subject: 'Create Ticket for Test',
      user_id: user.id,
      user_role: user.roles.toString(),
      conclusion: new Date(),
      condition: 'fake_condition',
      status: 'fake_status',
    });

    const listTickets = await listAllTicketsByUserService.execute({
      user_id: user.id,
    });

    expect(listTickets).toEqual([ticket]);
  });

  it('should not return tickets inexist user', async () => {
    await expect(
      listAllTicketsByUserService.execute({
        user_id: 'inexist_user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
