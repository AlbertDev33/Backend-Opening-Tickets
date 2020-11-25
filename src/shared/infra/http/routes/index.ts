import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import agentsRouter from '@modules/agents/infra/http/routes/agents.routes';
import ticketsRouter from '@modules/tickets/infra/http/routes/tickets.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/agents', agentsRouter);
routes.use('/tickets', ticketsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);

export default routes;
