import { Request,Response } from "express";
import UserService from '../Service/userService';
import UserModel,{UserBuilder} from '../Model/User'
const userService=new UserService();

const user=new UserBuilder();
export default class User{

   addUser(req:Request,res:Response){
        try {
           const [email,mobile,password]= req.body;
            user.setEmail(email)
            .setMobile(mobile)
            .setPassword(password);
            userService.addService(user.getUser());          
        } catch (error) {
            res.status(404).json(error);
        }
   }
   deleteUser(req:Request,res:Response){

   }
   editUser(req:Request,res:Response){

   }
   getall(req:Request,res:Response){

   }
   getOne(req:Request,res:Response){

   }
    login(req:Request,res:Response){

    }
    logout(req:Request,res:Response){
        
    }

}