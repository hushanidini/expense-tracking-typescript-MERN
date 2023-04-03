import express from 'express';

import { register } from '../controllers/authenticationCtrl';

export default (router: express.Router) => {
  router.post('/auth/register', register);
  // router.post('/auth/login', login);
};