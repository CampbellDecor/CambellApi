 import fire from './Firebase';
 import validator from 'validator';
 class FireDb{
    Db:any;
    fireDB=fire.database();
    collection?:string;
    constructor(collection:string){
        this.collection=collection;
        this.Db=this.fireDB.ref(collection);
    }
     async add(object:Object,id?:string|number|Boolean):Promise<any>{
       let dbobj;
        try{
            if(id!=undefined) {
                if(validator.isBoolean(id as any)){
                    let itemCount=0
                    await this.Db.once('value', (snapshot:any) => {
                        itemCount = snapshot.numChildren();
                     });
                    id=id?itemCount++:Math.floor(Math.random()*itemCount);
                }
                dbobj=this.Db.child(id)
            }
            else dbobj= await this.Db.push().then(
                (item:any)=>{
                    id=item.key;
                }
            )
            await dbobj.set(object);
            return id;
        }catch(error){
            throw error;
        }
     }
    
}