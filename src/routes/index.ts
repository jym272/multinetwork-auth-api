import express from 'express';
import { home } from '@routes/home';
import { utils } from '@routes/utils';
import { db } from '@routes/db';

const routes = [db, home, utils];

export const addRoutes = (server: express.Express) => {
  for (const route of routes) {
    server.use(route);
  }
};
