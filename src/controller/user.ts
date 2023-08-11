import { Request,Response, response } from "express";
import {ServiceProvider} from '../Service/Service';
import UserModel,{UserBuilder} from '../Model/User'
import{RoleController} from './controller';

const userservice=new ServiceProvider("user").getService();

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
    async getAll(req: Request, res: Response){
      try{
         await userservice.getAll();
      }catch(err){
        res.json(err);
      }
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