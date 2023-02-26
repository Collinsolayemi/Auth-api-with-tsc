import express, { Request, Response, NextFunction } from 'express';
import { get, merge } from 'lodash';
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
