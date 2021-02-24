import express, { Request, Response, NextFunction, Application } from 'express';
import cors from 'cors';
import * as http from 'http';

import AppError from '@shared/errors/AppError';

import routes from '@shared/infra/http/routes';
import uploadConfig from '@config/upload';
import * as database from '@shared/infra/typeorm';

import 'dotenv/config';
import '@shared/infra/typeorm';
import '@shared/providers';

export class SetupServer {
  private app = express();

  private server?: http.Server;

  constructor(private port = 3333) {}

  public async init(): Promise<void> {
    this.setupExpress();
    await this.databaseConnect();
    this.setupErrorHandlers();
  }

  private setupExpress(): void {
    this.app.use(cors({ origin: '*' }));
    this.app.use(express.json());
    this.app.use('/files', express.static(uploadConfig.uploadsFolder));
    this.app.use(routes);
  }

  public async start(): Promise<void> {
    this.app.listen(this.port, () => {
      console.info(`🚀 Executando na porta ${this.port}`);
    });
  }

  private async databaseConnect(): Promise<void> {
    await database.openConnection();
  }

  public async close(): Promise<void> {
    await database.close();
    if (this.server) {
      await new Promise<void>((resolve, reject) => {
        return this.server?.close(err => {
          if (err) {
            return reject(err);
          }
          return resolve();
        });
      });
    }
  }

  public getApp(): Application {
    return this.app;
  }

  private setupErrorHandlers(): void {
    this.app.use(
      (err: Error, _: Request, response: Response, __: NextFunction) => {
        if (err instanceof AppError) {
          return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
          });
        }

        console.error(err);

        return response.status(500).json({
          status: 'error',
          message: 'Internal server error',
        });
      },
    );
  }
}
