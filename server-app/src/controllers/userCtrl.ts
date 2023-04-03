import { Request, Response } from 'express';
import { deleteUserById, getUsers , getUserById} from '../models/User';
import Log from '../lib/log';

/** get all users */
export const getAllUsers = async (req:Request, res: Response) => {
    try{
        const users = await getUsers();
        return res.status(200).json(users);
    }catch(error){
        Log.Error(error);
        return res.sendStatus(400);
    }
}

/** update user */
export const updateUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { fullname, username } = req.body;
  
      if (!username) {
        Log.Error('Can not found username');
        return res.sendStatus(400);
      }
  
      const user = await getUserById(id);
      
      if(user){
        user.username = username;
        user.fullname = fullname;
        await user.save();
    
        return res.status(200).json(user).end();
      }else{
        Log.Error('Can not found user');
      }
      
    } catch (error) {
      Log.Error(error);
      return res.sendStatus(400);
    }
  }



/** Delete User */
export const deleteUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedUser = await deleteUserById(id);
      return res.json(deletedUser);
    } catch (error) {
      Log.Error(error);
      return res.sendStatus(400);
    }
  }

