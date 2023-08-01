import { Request,Response, response } from "express";
import UserService from '../Service/userService';
import UserModel,{UserBuilder} from '../Model/User'
import{RoleController} from './controller';
const userService=new UserService();

const user=new UserBuilder();
export default class UserContoller extends RoleController{
    add(req: Request, res: Response): void {
       try {
         const {uid,password,username,religion,firstname,lastname,email,mobile}=req.body;
        if((email | mobile) && password){

        }else{
            res.redirect("/add");
        }
        
       } catch (error) {
        throw error;
       }
    }
    edit(req: Request, res: Response): void {
        throw new Error("Method not implemented.");
    }
    delete(req: Request, res: Response): void {
        throw new Error("Method not implemented.");
    }
    getAll(req: Request, res: Response): void {
        throw new Error("Method not implemented.");
    }
    getById(req: Request, res: Response): void {
        throw new Error("Method not implemented.");
    }
    login(req: Request, res: Response): void {
        throw new Error("Method not implemented.");
    }
    logout(req: Request, res: Response): void {
        throw new Error("Method not implemented.");
    }
    isexist(req: Request, res: Response): void {
        throw new Error("Method not implemented.");
    }
   

}