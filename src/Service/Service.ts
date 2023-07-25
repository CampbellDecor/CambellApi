import{Model} from '../Model/Model'
export default interface Service{
    addService(model:Model):string;
    addService(model:Model,id:string):string;
    editService(model:Model):Model;
    editService(model:Model,id:string):Model;
    FindByID(id:string|number):Model;
    getAll():Array<Model>;
    deleteService(model:Model):any;
    deleteService(model:string):any;
    sort():Array<Model>;
    sort(field:string):Array<Model>;
    isExist(model:string):boolean;
    isExist(model:Model):boolean;
    search(model:string):any;
    search(model:Object):any;
}