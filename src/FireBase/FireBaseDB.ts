import {database} from './Fire'
import {Model} from '../Model/Model';

class FireDatabase{
    Database=database();
    private Entity:any;
    constructor(collection?:string){
        this.Entity=this.Database.ref(collection);
    }
    async add(element:Object){
       try {
          const row=await this.Entity.push();
          await row.set(element);
          return row.key;
       } catch (error) {
            throw error;
       }
    }
    async addWithId(element:Object,id:number|string){
        try {
           const row=await this.Entity.child(id);
           await row.set(element);
           return row.key;
        } catch (error) {
             throw error;
        }
     }
     async addWithIncrement(element:Object){
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
        return await this.getAll();
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
     async edit(element:Model){
      try {
         await this.Entity.child(element.getId()).update(element);
         return element;
         return await this.getAll();
      } catch (error) {
         throw error;
      }
     }
     async editWithId(element:Object,id:string|number){
      try {
         await this.Entity.child(id).update(element);
         return element;
      } catch (error) {
         throw error;
      }
     }
     async orderById(){
      try {
         const snapshot=await this.Entity.orderByKey().once('value');
         return snapshot.val()

      } catch (error) {
         throw error;
      }
     }
     async orderBy(field:string){
      try {
         const snapshot=await this.Entity.orderByChild(field).once('value');
         return snapshot.val()

      } catch (error) {
         throw error;
      }
     }
     async getAll(){
      try {
         const snapshot=await this.Entity.once('value');
         return snapshot.val();
      } catch (error) {
         throw error;
      }
     }
     async getByID(id:string|number){
      try {
         const snapshot = await this.Entity.child(id).once('value');

         // Check if the snapshot contains data
         if (snapshot.exists()) {
           // Extract the data from the snapshot and return it
           const data = snapshot.val();
           return data;
         } else {
           // If the snapshot doesn't contain data for the given ID
           return `No data found for ID: ${id}`;
         }
      } catch (error) {
         throw error;
      }
     }
     async count(){
      try {
         let itemCount:number=0;
         await this.Entity.once('value', (snapshot:any) => {
            itemCount = snapshot.numChildren();
         });
         return itemCount;
      } catch (error) {
         throw error;
      }
     }
     
    
}
export default FireDatabase;
