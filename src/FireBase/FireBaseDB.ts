import {database} from './Fire'

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
     
    
}
