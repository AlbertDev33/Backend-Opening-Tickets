import FakeTicketsRepository from '@modules/tickets/repositories/fakes/FakeTicketsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import UpdateTicketMessageService from '@modules/tickets/services/UpdateTicketMessageService';
// import AppError from '@shared/errors/AppError';

let fakeTicketsRepository: FakeTicketsRepository;
let fakeUsersRepository: FakeUsersRepository;
let updateTicketMessageService: UpdateTicketMessageService;

describe('UpdateTickeMessageService', () => {
  beforeAll(() => {
    fakeTicketsRepository = new FakeTicketsRepository();
    fakeUsersRepository = new FakeUsersRepository();

    updateTicketMessageService = new UpdateTicketMessageService(
      fakeTicketsRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to update the message of a ticket', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      roles: [],
    });

    const ticket = await fakeTicketsRepository.create({
      identifier: 'fake_identifier',
      message: 'Ticket Test',
      subject: 'Create Ticket for Test',
      user_id: 'fake_user_id',
      user_role: 'fake_user_role',
      condition: 'fake_condition',
      status: 'fake_status',
      conclusion: new Date(),
    });

    await updateTicketMessageService.execute({
      user_id: user.id,
      ticket_id: ticket.id,
      message: 'new_message',
    });

    expect(ticket.message).toBe('new_message');
  });
});
