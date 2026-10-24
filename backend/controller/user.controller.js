import { createUser } from "../service/user.service.js";
import { validationResult } from "express-validator";
import userModel from "../models/user.model.js";
import {redisClient} from '../service/redis.service.js';

export const createUserController = async(req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try{
        const user = await createUser(req.body);
        const token = user.generatejwt();
        res.status(201).json({message:"User created successfully",user,token});
    } catch (error) {
        res.status(500).json({message:"Error creating user",error});
    }
}

export const loginController = async(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try{
        const{email,password} = req.body;
        const user = await userModel.findOne({email}).select('+password');
        if(!user){
            return res.status(400).json
            ({message:"Invalid email or password"});
        }

        const isMatch = await user.isValidPassword(password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid email or password"});
        }
        const token = user.generatejwt();
        res.status(200).json({message:"Login successful",user,token});


    } catch (error) {
        res.status(500).json({message:"Error logging in",error});
        console.log(error);
    }
}

export const ProfileController = async(req,res) => {
    console.log(req.user);

    res.status(200).json({
        user:req.user});
}

export const logoutController = async(req,res) => {
    try{
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        if(!token){
            return res.status(401).json({message:"Unauthorized"});
        }
        await redisClient.set(token,'logout','EX',24*60*60);
        res.status(200).json({message:"Logout successful"});
    }
    catch(error){
        console.log(error);
        res.status(500).send(error.message);
    }
}