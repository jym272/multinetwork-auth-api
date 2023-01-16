import { Request, Response } from 'express';
import { controllerErrorWithMessage, getEnvOrFail, isValidEmail, isValidPassword } from '@utils/index';
import { getSequelizeClient } from '@db/sequelize';
import { SignupType } from '@custom-types/index';
import { User } from '@db/models';
import bcrypt from 'bcrypt';
const sequelize = getSequelizeClient();

const pepper = getEnvOrFail('PASSWORD_PEPPER');

export const signupController = () => {
  return async (req: Request, res: Response) => {
    const { email, password } = req.body as SignupType;

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid email.' });
    }
    if (!isValidPassword(password)) {
      return res.status(400).json({ message: 'Invalid password.' });
    }
    const hashedPassword = await bcrypt.hash(password + pepper, 10);

    try {
      await sequelize.transaction(async () => {
        return await User.create({
          email,
          password: hashedPassword
        });
      });
      return res.json({ message: 'User created.' });
    } catch (err) {
      return controllerErrorWithMessage(res, err, 'Creating User failed.');
    }
  };
};

// app.post('/signup', async (req, res) => {
//   // It's just a dummy service - we don't really care for the email
//   const email = req.body.email;
//   const password = req.body.password;
//
//   if (!password || password.trim().length === 0 || !email || email.trim().length === 0) {
//     return res.status(422).json({ message: 'An email and password needs to be specified!' });
//   }
//
//   try {
//     const hashedPW = await axios.get('http://auth/hashed-password/' + password);
//     // since it's a dummy service, we don't really care for the hashed-pw either
//     console.log(hashedPW, email);
//     res.status(201).json({ message: 'User created!' });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: 'Creating the user failed - please try again later.' });
//   }
// });
