import {Router} from 'express';
import {celebrate, Joi, Segments} from 'celebrate';

import multer from 'multer';

import uploadConfig from '@config/upload';
import UserController from '@modules/users/infra/http/controllers/UsersController';
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig.multer);
const userController = new UserController();
const userAvatarController = new UserAvatarController();

usersRouter.post('/',celebrate({
    [Segments.BODY]:{
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    },
}), userController.create);

usersRouter.patch('/avatar',
ensureAuthenticated, 
upload.single('avatar'), userAvatarController.update)

export default usersRouter;