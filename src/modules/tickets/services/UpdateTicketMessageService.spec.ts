import FakeTicketsRepository from '@modules/tickets/repositories/fakes/FakeTicketsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import UpdateTicketMessageService from '@modules/tickets/services/UpdateTicketMessageService';
import AppError from '@shared/errors/AppError';

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

  it('should not be able to update a message of a ticket with invalid user_id', async () => {
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

    await expect(
      updateTicketMessageService.execute({
        user_id: 'non_exist',
        ticket_id: ticket.id,
        message: 'fake_message',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a message of a ticket with invalid ticket_id', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      roles: [],
    });

    await expect(
      updateTicketMessageService.execute({
        user_id: user.id,
        ticket_id: 'non_exist',
        message: 'fake_message',
      }),
    ).rejects.toBeInstanceOf(AppError);
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
