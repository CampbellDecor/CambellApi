const Fire = require( "../Fire" );

const FireStore = Fire.firestore();

class FireStoreModel{
    constructor ( collection )
    {
        this.collectionRef = FireStore.collection( collection );
    }
   async getAll ()
   {
       try {
           const document = [] 
           const snapshot = this.collectionRef.get();
           (await snapshot).forEach( (doc) =>
           {
               document.unshift( { id: doc.id, ...doc.data() } );
           } )
           return document;
       } catch (error) {
           throw error;
       }
      
    }
    async DocumentByID( id ){
        try {
            const document = await this.collectionRef.doc( id ).get();
            return {id:document.id,...document.data()}
        } catch (error) {
            throw error;
        }
    }
    async addDocument ( element={}, id ="" )
    {
        try
        {
           let docid;
            if ( id === "" )
            {
                let doc = await this.collectionRef.add( element );
                docid = doc.id;
            } else
            {
                let doc = await this.collectionRef.doc( id );
                await doc.set( element );
                docid = id;
            }
         return docid;
        } catch (error) {
            
        }
    }
    async deleteDoc( id ){
        try {
            const user = await this.collectionRef.doc( id );
            user.delete();
            return true;
        } catch (error) {
            throw error;
        }
    }
    async updateDoc (Doc,id)
    {
        try {
            const doc = await this.collectionRef.doc( id );
            doc.update( Doc );
            return doc;
        } catch (error) {
            throw Error;
        }
    }
    async countDoc ()
    {
        try {
            const count = await this.collectionRef.get();
            return count.size;
        } catch (error) {
            throw error;
        }
    }
}
module.exports = FireStoreModel;