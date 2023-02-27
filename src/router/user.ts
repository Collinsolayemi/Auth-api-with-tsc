import express, { Router } from 'express';
import { getAllUsers, deleteUser } from '../controller/users';
import { isAuthenticated, isOwner } from '../middleware/index';

export default (router: Router) => {
  router.get('/users', isAuthenticated, getAllUsers);
  router.delete('/users/:id', isOwner, deleteUser);
};
