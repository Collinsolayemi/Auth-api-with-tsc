import express, { Router } from 'express';
import { getAllUsers } from 'controller/users';

export default (router: Router) => {
  router.get('/', getAllUsers);
};
