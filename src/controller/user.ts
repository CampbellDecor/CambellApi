import { Request,Response, response } from "express";
import UserService from '../Service/userService';
import UserModel,{UserBuilder} from '../Model/User'
import {UserController} from './controller';
const userService=new UserService();

const user=new UserBuilder();
export default class User extends UserController{
    add(req:Request,res:Response):void{
        try {
            const {email,password,mobile}=req.body;
            user.setEmail(email).setPassword(password).setMobile(mobile)
        } catch (error) {
            response.status(404).json(error);
        }
        
        }
    edit(req:Request,res:Response):void{

    }
    delete(req:Request,res:Response):void{

    }
    getAll(req:Request,res:Response):void{

    }
    getById(req:Request,res:Response):void{

    }
    login(req:Request,res:Response):void{

    }
    logout(req:Request,res:Response):void{

    }
  

}