import { loginController } from '@controllers/db/login';
import { signupController } from '@controllers/db/signup';

export const dbController = {
  login: loginController(),
  signup: signupController()
};
