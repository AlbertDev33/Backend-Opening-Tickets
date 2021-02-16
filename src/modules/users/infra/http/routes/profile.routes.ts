import { Router } from 'express';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';

import ensureAuthenticated from '@shared/infra/http/middlewares/confirmUserAuthenticated';
import confirmAdminAuthenticated from '@shared/infra/http/middlewares/confirmAdminAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated || confirmAdminAuthenticated);

profileRouter.get('/:user_id', profileController.show);
profileRouter.patch('/', profileController.update);

export default profileRouter;
