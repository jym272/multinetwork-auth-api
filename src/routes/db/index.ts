import { Router } from 'express';
import { dbController } from '@controllers/db';

export const db = Router();

db.post('/login', dbController.login);
db.post('/signup', dbController.signup);
