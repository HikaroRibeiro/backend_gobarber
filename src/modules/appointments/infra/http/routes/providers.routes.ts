import {Router, response} from 'express';
import {celebrate, Segments, Joi} from 'celebrate';

import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';
import ProviderMonthAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderDayAvailabilityController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerDayController = new ProviderDayAvailabilityController();
const providerMonthController = new ProviderMonthAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/',providersController.index);
providersRouter.get('/:provider_id/day-availability',celebrate({
    [Segments.PARAMS]: {
        provider_id: Joi.string().uuid().required(),
    },
}), providerDayController.index);

providersRouter.get('/:provider_id/month-availability',celebrate({
    [Segments.PARAMS]: {
        provider_id: Joi.string().uuid().required(),
    },
}), providerMonthController.index);

export default providersRouter;