import {database} from './Fire'
import {Model} from '../Model/Model';
import validator from 'validator';
class FireDatabase{
    Database=database();
    private Entity:any;
    constructor(collection?:string){
        this.Entity=this.Database.ref(collection);
    }
    async add(element:Model){
       try {
          const row=await this.Entity.push();
          await row.set(element);
          return row.key;
       } catch (error) {
            throw error;
       }
    }
    async addWithId(element:Model,id:number|string){
        try {
           const row=await this.Entity.child(id);
           await row.set(element);
           return row.key;
        } catch (error) {
             throw error;
        }
     }
     async addWithIncrement(element:Model){
      try {
        const  snapshot=await this.Entity.orderByKey().limitToLast(1).once('value');
    // The snapshot will contain the last added element, which you can get the key from.
      const lastKey = Object.keys(snapshot.val())[0];

             const row=await this.Entity.child(parseInt(lastKey)+1);
             await row.set(element);
             return row.key;
            
      } catch (error) {
         throw error;
      }
     }
     async delete(element:Model){
      try {
        await this.Entity.child(element.getId()).remove();
      } catch (error) {
         throw error;
      }
     }
     async deleteWithId(element:string|number){
      try {
        await this.Entity.child(element).remove();
      } catch (error) {
         throw error;
      }
     }
     
    
}
