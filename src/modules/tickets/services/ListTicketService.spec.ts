import FakeTicketsRepository from '@modules/tickets/repositories/fakes/FakeTicketsRepository';
import FakeCacheProvider from '@shared/providers/CacheProvider/fakes/FakeCacheProvider';

import ListTicketService from '@modules/tickets/services/ListTicketService';
import AppError from '@shared/errors/AppError';

let fakeTicketsRepository: FakeTicketsRepository;
let fakeCacheProvider: FakeCacheProvider;
let listTicketService: ListTicketService;

describe('ListTicket', () => {
  beforeAll(() => {
    fakeTicketsRepository = new FakeTicketsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listTicketService = new ListTicketService(
      fakeTicketsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able list a valid ticket', async () => {
    const ticket = await fakeTicketsRepository.create({
      identifier: 'fake_identifier',
      message: 'Ticket Test',
      subject: 'Create Ticket for Test',
      user_id: 'fake_id',
      user_role: 'fake_role',
      conclusion: new Date(),
      condition: 'fake_condition',
      status: 'fake_status',
    });

    expect(await listTicketService.execute(ticket.id)).toEqual(ticket);
  });

  it('should not be able list a invalid ticket', async () => {
    await expect(
      listTicketService.execute('invalid_ticket_id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
