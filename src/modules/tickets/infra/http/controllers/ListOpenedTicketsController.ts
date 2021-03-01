import {
  HttpRequest,
  IRequest,
  IResponse,
} from '@shared/infra/http/ExpressImplementation/HttpRequest';

import ListAllOpenedTicketsService from '@modules/tickets/services/ListAllOpenedTicketsService';
import TicketsRepository from '@modules/tickets/infra/typeorm/repositories/TicketsRepository';
import RedisCacheProvider from '@shared/providers/CacheProvider/implementations/RedisCacheProvider';

export default class ListOpenedTicketsController extends HttpRequest {
  public async index(
    request: IRequest,
    response: IResponse,
  ): Promise<IResponse> {
    const ticketsRepository = new TicketsRepository();
    const cacheProvider = new RedisCacheProvider();

    const listAllOpenedTickets = new ListAllOpenedTicketsService(
      ticketsRepository,
      cacheProvider,
    );

    const listOpenedTickts = await listAllOpenedTickets.execute();

    return response.json(listOpenedTickts);
  }
}
