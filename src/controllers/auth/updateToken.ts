import { Request, Response } from 'express';
import { controllerErrorWithMessage, getEnvOrFail } from '@utils/index';
import { getSequelizeClient } from '@db/sequelize';
import { AccessType } from '@custom-types/index';
import { Auth } from '@db/models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const sequelize = getSequelizeClient();

const pepper = getEnvOrFail('PASSWORD_PEPPER');
const secret = getEnvOrFail('JWT_SECRET');

export const updateTokenController = () => {
  return async (req: Request, res: Response) => {
    const { password, email } = req.body as AccessType;
    const auth = await Auth.findOne({
      where: {
        email
      }
    });
    if (!auth) {
      return res.status(400).json({ message: 'Invalid email.' });
    }
    const hashPassword = auth.hashPassword;
    const isPasswordValid = await bcrypt.compare(password + pepper, hashPassword);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password.' });
    }

    const permissions = {
      authenticate: true
    };
    const options = {
      expiresIn: '1d'
    };
    const token = jwt.sign(permissions, secret, options);

    try {
      await sequelize.transaction(async () => {
        auth.token = token;
        return await auth.save();
      });
      return res.json({ token });
    } catch (err) {
      return controllerErrorWithMessage(res, err, 'Saving Auth token failed.');
    }
  };
};
