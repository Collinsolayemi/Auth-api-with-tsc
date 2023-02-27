import express, { Request, Response } from 'express';
import { getUsersByEmail, createUser, UserModel } from '../db/user';
import { random, authentication } from '../helpers';

export const logIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.sendStatus(404);
    }

    //get the user
    const user = await getUsersByEmail(email).select(
      '+authentication.salt +authentication.password'
    );

    //compare keyboard
    const compareHash = authentication(user.authentication.salt, password);
    if (user.authentication.password !== compareHash) {
      return res.sendStatus(403);
    }

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    user.save;
    res.cookie('ANTONIO-AUTH', user.authentication.sessionToken, {
      domain: 'localhost',
      path: '/',
    });

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

//register new user
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;

    //check if require field exist
    if (!email || !password || !username) return res.sendStatus(400);

    // const existingUser = await getUsersByEmail(email);
    // if (!existingUser) return res.sendStatus(400);

    //if everything is okay lets create the authentication
    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
