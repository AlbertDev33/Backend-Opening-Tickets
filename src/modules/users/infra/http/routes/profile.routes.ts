import { Router } from 'express';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';

import ensureAuthenticated from '@shared/infra/http/middlewares/confirmUserAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);
profileRouter.patch('/', profileController.update);

export default profileRouter;
