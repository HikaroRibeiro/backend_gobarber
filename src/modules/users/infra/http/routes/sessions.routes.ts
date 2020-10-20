import {Router} from 'express';
import SessionsController from '@modules/users/infra/http/controllers/SessionsController';
import {celebrate, Joi, Segments} from 'celebrate';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post('/',celebrate({
    [Segments.BODY]:{
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    }
}),sessionsController.create);

export default sessionsRouter;