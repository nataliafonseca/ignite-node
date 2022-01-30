import { PasswordResetController } from '@modules/accounts/useCases/passwordReset/PasswordResetController';
import { SendForgotPasswordMailController } from '@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController';
import { Router } from 'express';

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const passwordResetController = new PasswordResetController();

passwordRoutes.post('/forgot', sendForgotPasswordMailController.handle);
passwordRoutes.post('/reset', passwordResetController.handle);

export { passwordRoutes };
