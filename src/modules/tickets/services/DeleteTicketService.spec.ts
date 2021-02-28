import FakeTicketsRepository from '@modules/tickets/repositories/fakes/FakeTicketsRepository';

import DeleteTicketService from '@modules/tickets/services/DeleteTicketService';
import AppError from '@shared/errors/AppError';

let fakeTicketsRepository: FakeTicketsRepository;
let deleteTicketService: DeleteTicketService;

describe('DeleteTickets', () => {
  beforeAll(() => {
    fakeTicketsRepository = new FakeTicketsRepository();

    deleteTicketService = new DeleteTicketService(fakeTicketsRepository);
  });

  it('should be able to delete tickets', async () => {
    const ticket = await fakeTicketsRepository.create({
      identifier: 'fake_identifier',
      subject: 'subject_test',
      message: 'message_test',
      user_id: 'user_id_test',
      user_role: 'user_role_test',
      status: 'status_test',
      condition: 'condition_test',
    });

    expect(await deleteTicketService.execute(ticket.id)).toBe(undefined);
  });

  it('should return error if ticket id non-exsits', async () => {
    await expect(
      deleteTicketService.execute('non_exist_id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
