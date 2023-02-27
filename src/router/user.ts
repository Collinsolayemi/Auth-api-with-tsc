import express, { Router } from 'express';
import { getAllUsers } from '../controller/users';
import { isAuthenticated } from '../middleware/index';

export default (router: Router) => {
  router.get('/users', getAllUsers);
};
