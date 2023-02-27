import express, { Request, Response, NextFunction } from 'express';
import { getUsers, getUsersByEmail } from '../db/user';

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
