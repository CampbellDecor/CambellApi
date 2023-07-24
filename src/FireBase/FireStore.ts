import * as fire from './Firebase'

class FireStore{
    store?:any;
    firestore=fire.firestore();
    collection?:string;
    constructor(collection?:string){
        this.collection=collection;
        this.store=typeof(collection)=='string'?this.firestore.collection(collection):this.firestore;
    }
    async addDoc(object:Object,id?:string|Boolean){
        this.available();
        try {
            if(id==undefined){
                await this.store.doc().create(object);
            }else{
                if(typeof(id)=='boolean'){
                    const Collectionall=await this.store.get();
                    let count:number=Collectionall.size;
                    id==true?count++:Math.floor(Math.random()*count);
                    id =count.toString();
                }
                await this.store.doc(id).set(object);
                return id;
            }
        } catch (error) {
            throw error;
        }
       
    }
    available():boolean|void{
       if(this.collection==undefined) return;
       else return true;
    }
}