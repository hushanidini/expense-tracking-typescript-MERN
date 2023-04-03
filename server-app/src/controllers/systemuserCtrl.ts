import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Systemusers from '../models/SystemUser';
import bcrypt from 'bcryptjs';
import Log from '../lib/log';

/** create Systemusers */
const createSystemUser =   async (req: Request, res: Response, next: NextFunction) => {
    const { name, username, email, password } = req.body;
   
    //check user exists
    const userExists = await Systemusers.findOne({email});
    if(userExists){
        // throw message
        Log.Error('User already exists');
        return res.status(500).json({ msg: "User already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const systemuser =  new Systemusers({
        _id: new mongoose.Types.ObjectId(),
        name, 
        username, 
        email,  
        password: hashPassword
    });

    try {
        const systemuser_res = await systemuser
            .save();
        return res.status(201).json({
            msg: 'User Registered Successfuly',
            data: systemuser_res });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export default {createSystemUser};
