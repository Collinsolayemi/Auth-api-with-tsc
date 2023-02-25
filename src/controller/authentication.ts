import express from 'express';
import { getUsersByEmail, createUser } from '../db/user';
import { random, authentication } from '../helpers';

//log in functionality
export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    //check if require field exist
    if (!email || !password || !username) return res.sendStatus(400);

    const existingUser = await getUsersByEmail(email);
    if (!existingUser) return res.sendStatus(400);

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
    res.sendStatus(400);
  }
};
