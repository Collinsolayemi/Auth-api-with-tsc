import express, { Router } from 'express';
import { getAllUsers, deleteUser, updateUser } from '../controller/users';
import { isAuthenticated, isOwner } from '../middleware/index';

export default (router: Router) => {
  router.get('/users', isAuthenticated, getAllUsers);

  router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
  router.patch('/user/:id', isAuthenticated, isOwner, updateUser);
};
