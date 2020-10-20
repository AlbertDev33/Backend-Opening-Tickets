import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import ticketsRouter from '@modules/tickets/infra/http/routes/tickets.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/tickets', ticketsRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
