/* eslint-disable @typescript-eslint/no-empty-interface */
import { Request, Response } from 'express';

export interface IRequest extends Request {
  user: {
    id: string;
    userRoles: string;
  };
}

export interface IResponse extends Response {}

export class HttpRequest {
  static async create(
    request: IRequest,
    response: IResponse,
  ): Promise<IRequest | IResponse> {
    return request && response;
  }
}
