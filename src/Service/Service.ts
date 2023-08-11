
import{Model} from '../Model/Model';
import User from "./userService";
export default interface Service{
    getAll():any;
}

export class ServiceProvider{
    private service:Service;
    constructor(servicePro?:string){
        switch (servicePro) {
            case "user":this.service=new User();break;
            default:this.service=new User();break;
        }
    }
     getService():Service{
        return this.service;
    }
}