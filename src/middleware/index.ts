import express, { Request, Response, NextFunction } from 'express';
import { get, identity, merge } from 'lodash';
import { getUsersBySessionToken } from '../db/user';

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sectionToken = req.cookies['ANTONIO-AUTH'];
    if (!sectionToken) return res.sendStatus(403);

    //check if there is a user with the session token
    const existingUser = await getUsersBySessionToken(sectionToken);
    if (!existingUser) return res.sendStatus(403);

    merge(req, { identity: existingUser });
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
};

//middleware to check owner
export const isOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, 'identity._id') as string;
    if (!currentUserId) {
      return res.status(403);
    }
    if (currentUserId !== id) {
      return res.status(403);
    }

    next();
  } catch (err) {
    console.log(err);
    res.status(400);
  }
};
