import express, { Request, Response, NextFunction } from 'express';
import { getUsers } from 'db/user';

//get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const user = await getUsers();
    res.sendStatus(200).json(user);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
