import CambellStore from '../FireBase/FireStore'
import { Model } from '../Model/Model';
import Service from './Service';
import Model_OurService from '../Model/OurService';

const Store=new CambellStore('service');
class Service_OurService implements Service{

    addService(model: Model_OurService): string;
    addService(model: Model_OurService, id: string): string;
    addService(model: Model_OurService, id?: string): string {
        let serid:string="";
        async ()=>{
        
       try {
       
            if(id){
               serid= id=='/aci/i'?await Store.addWithIncrement(model):await Store.addWithId(model,id);
            }else{
                serid=await Store.add(model);
            }
      
       } catch (error) {
        throw error;
        serid="error";
       }
    }
    return serid;
    }
    editService(model: Model): Model;
    editService(model: Model, id: string): Model;
    editService(model: unknown, id?: unknown): Model {
        throw new Error('Method not implemented.');
    }
    FindByID(id: string | number): Model {
        throw new Error('Method not implemented.');
    }
    getAll(): Model[] {
        throw new Error('Method not implemented.');
    }
    deleteService(model: Model):any;
    deleteService(model: string):any;
    deleteService(model: unknown): any {
        throw new Error('Method not implemented.');
    }
    sort(): Model[];
    sort(field: string): Model[];
    sort(field?: unknown): Model[] {
        throw new Error('Method not implemented.');
    }
    isExist(model: string): boolean;
    isExist(model: Model): boolean;
    isExist(model: unknown): boolean {
        throw new Error('Method not implemented.');
    }
    search(model: string):any;
    search(model: Object):any;
    search(model: unknown): any {
        throw new Error('Method not implemented.');
    }
   

}
