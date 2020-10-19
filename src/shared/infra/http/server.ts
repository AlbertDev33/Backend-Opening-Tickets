import 'reflect-metadata';

import express from 'express';

import '@shared/infra/typeorm';

const app = express();

app.use(express.json());

app.listen(3333, () => {
  console.log('🚀 Executando na porta 3333');
});
