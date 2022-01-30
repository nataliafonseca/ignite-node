import uploadConfig from '@config/upload';
import { ensureAuthenticated } from '@shared/infra/http/middleware/ensureAuthenticated';
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';
import { Router } from 'express';
import multer from 'multer';
import { UserProfileController } from '@modules/accounts/useCases/userProfile/UserProfileController';

const usersRoutes = Router();
const uploadAvatar = multer(uploadConfig);
const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const userProfileController = new UserProfileController();

usersRoutes.post('/', createUserController.handle);

usersRoutes.use(ensureAuthenticated);
usersRoutes.get('/profile', userProfileController.handle);
usersRoutes.patch(
  '/avatar',
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle,
);

export { usersRoutes };
