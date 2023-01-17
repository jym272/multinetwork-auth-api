import { Request, Response } from 'express';
import { getEnvOrFail } from '@utils/env';
import jwt, { VerifyErrors } from 'jsonwebtoken';

const secret = getEnvOrFail('JWT_SECRET');

export const verifyTokenController = () => {
  return (req: Request, res: Response) => {
    const token = req.params.token;
    let decoded;
    try {
      decoded = jwt.verify(token, secret);
    } catch (e: unknown) {
      const err = e as VerifyErrors;
      const msg = err.name === 'TokenExpiredError' ? 'Token expired.' : 'Invalid token.';
      return res.status(400).json({ message: msg });
    }
    return res.json(decoded);
  };
};
