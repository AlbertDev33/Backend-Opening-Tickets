import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import ticketsRouter from '@modules/tickets/infra/http/routes/tickets.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import permissionsRouter from '@modules/users/infra/http/routes/permissions.routes';
import rolesRouter from '@modules/users/infra/http/routes/roles.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/tickets', ticketsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/permissions', permissionsRouter);
routes.use('/roles', rolesRouter);

export default routes;
