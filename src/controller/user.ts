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

}