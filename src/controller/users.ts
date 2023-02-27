import express, { Request, Response, NextFunction } from 'express';
import {
  getUsers,
  deleteUserById,
  updateUserById,
  getUserById,
} from '../db/user';

//get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();

    res.status(200).json({
      status: 'success',
      total: users.length,
      users: users,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

//delete users
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await deleteUserById(id);
    res.status(400).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

//update user
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { username } = req.body;
    if (!username) return res.status(403);

    const user = await getUserById(id);
    user.username = username;
    user.save();

    res.status(200).json(user).end();
  } catch (err) {
    console.log(err);
    res.status(403);
  }
};
