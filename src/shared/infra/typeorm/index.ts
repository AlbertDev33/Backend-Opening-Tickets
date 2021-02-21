import { createConnection, Connection } from 'typeorm';

const closeConnection = new Connection({ type: 'postgres' });

export const openConnection = async (): Promise<Connection> =>
  createConnection();

export const close = (): Promise<void> => closeConnection.close();
