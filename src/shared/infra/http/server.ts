import 'reflect-metadata';

import express from 'express';
import cors from 'cors';

import routes from '@shared/infra/http/routes';

import '@shared/infra/typeorm';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('🚀 Executando na porta 3333');
});
