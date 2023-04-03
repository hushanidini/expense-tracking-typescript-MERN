import { Request, Response } from 'express';

import { getUserByEmail, createUser } from '../models/User';
import { authentication, random } from '../lib/helps';
import Log from '../lib/log';



export const register = async (req: Request, res: Response) => {
    try {
        const { fullname, email, password, username } = req.body;
    
        if (!fullname || !email || !password || !username) {
          return res.sendStatus(400);
        }
    
        const existingUser = await getUserByEmail(email);
      
        if (existingUser) {
           Log.Error('User already exists');
          return res.sendStatus(400);
        }
    
        const salt = random();
        const user = await createUser({
          fullname,  
          email,
          username,
          authentication: {
            salt,
            password: authentication(salt, password),
          },
        });
    
        return res.status(200).json(user).end();
      } catch (error) {
        Log.Error(error);
        return res.sendStatus(400);
      }
}