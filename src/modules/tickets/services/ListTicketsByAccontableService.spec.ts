import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeTicketsRepository from '@modules/tickets/repositories/fakes/FakeTicketsRepository';

import ListTicketsByAccontableService from '@modules/tickets/services/ListTicketsByAccontableService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeTicketsRepository: FakeTicketsRepository;
let listTicketsByAccontableService: ListTicketsByAccontableService;

describe('ListAllTicketsByAccountableService', () => {
  beforeAll(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeTicketsRepository = new FakeTicketsRepository();

    listTicketsByAccontableService = new ListTicketsByAccontableService(
      fakeUsersRepository,
      fakeTicketsRepository,
    );
  });

  it('should not be able list a ticket with a invalid user admin', async () => {
    await expect(
      listTicketsByAccontableService.execute({
        accountable_id: 'inexist_userAdmin',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to list all ticket for accountable', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      roles: [],
    });

    const ticket = await fakeTicketsRepository.create({
      identifier: '1231',
      message: 'Ticket Test',
      subject: 'Create Ticket for Test',
      user_id: user.id,
      user_role: user.roles.toString(),
      conclusion: new Date(),
      condition: 'fake_condition',
      status: 'fake_status',
      accountable: user.id,
    });

    const listTickets = await listTicketsByAccontableService.execute({
      accountable_id: user.id,
    });

    expect(listTickets).toEqual([ticket]);
  });
});
