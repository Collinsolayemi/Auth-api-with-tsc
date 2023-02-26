import express from 'express';
import { register, logIn } from '../controller/authentication';

export default (router: express.Router) => {
  router.post('/auth/register', register);
  router.post('/auth/login', logIn);
};
