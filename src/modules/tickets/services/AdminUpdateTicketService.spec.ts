import FakeTicketsRepository from '@modules/tickets/repositories/fakes/FakeTicketsRepository';
import FakeCacheProvider from '@shared/providers/CacheProvider/fakes/FakeCacheProvider';

import AdminUpdateTicketService from '@modules/tickets/services/AdminUpdateTicketService';

let fakeTicketsRepository: FakeTicketsRepository;
let fakeCacheProvider: FakeCacheProvider;
let adminUpdateTicketService: AdminUpdateTicketService;

describe('AdminUpdateTicket', () => {
  beforeAll(() => {
    fakeTicketsRepository = new FakeTicketsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    adminUpdateTicketService = new AdminUpdateTicketService(
      fakeTicketsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able update a ticket with admin user', async () => {
    const ticket = await fakeTicketsRepository.create({
      identifier: 'fake_identifier',
      message: 'Ticket Test',
      subject: 'Create Ticket for Test',
      user_id: 'fake_user_id',
      user_role: 'fake_user_role',
      condition: 'fake_condition',
      status: 'fake_status',
    });

    await adminUpdateTicketService.execute({
      subject: 'new_subject',
      message: 'new_message',
      status: 'Em andamento',
      condition: 'new_condition',
      accountable: 'new_accountable',
      ticket_id: ticket.id,
    });

    expect(ticket.subject).toBe('new_subject');
    expect(ticket.message).toBe('new_message');
    expect(ticket.status).toBe('Em andamento');
    expect(ticket.condition).toBe('new_condition');
    expect(ticket.accountable).toBe('new_accountable');
  });
});
