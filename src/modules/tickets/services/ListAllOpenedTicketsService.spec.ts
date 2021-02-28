import FakeTicketsRepository from '@modules/tickets/repositories/fakes/FakeTicketsRepository';
import FakeCacheProvider from '@shared/providers/CacheProvider/fakes/FakeCacheProvider';

import ListAllOpenedTicketsService from '@modules/tickets/services/ListAllOpenedTicketsService';

let fakeTicketsRepository: FakeTicketsRepository;
let fakeCacheProvider: FakeCacheProvider;
let listAllOpenedTicketsService: ListAllOpenedTicketsService;

describe('ListAllOpenedTickes', () => {
  beforeAll(() => {
    fakeTicketsRepository = new FakeTicketsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listAllOpenedTicketsService = new ListAllOpenedTicketsService(
      fakeTicketsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able list all opened tickets', async () => {
    expect(listAllOpenedTicketsService.execute()).not.toHaveProperty(
      'accountable',
    );
  });
});
