import {Request,Response} from 'express';
export interface Controller{
    add(req:Request,res:Response):void;
    edit(req:Request,res:Response):void;
    delete(req:Request,res:Response):void;
    getAll(req:Request,res:Response):void;
    getById(req:Request,res:Response):void;
    isexist(req:Request,res:Response):void;

}

export abstract  class RoleController implements Controller{
    abstract add(req:Request,res:Response):void;
    abstract edit(req:Request,res:Response):void;
    abstract delete(req:Request,res:Response):void;
    abstract getAll(req:Request,res:Response):void;
    abstract getById(req:Request,res:Response):void;
    abstract login(req:Request,res:Response):void;
    abstract logout(req:Request,res:Response):void;
    abstract isexist(req:Request,res:Response):void;

}
