import fire, { firestore } from './Fire'
import { Model } from '../Model/Model';
export default class FireStore {
   FireStoreB = firestore();
   private Entity: any;
   constructor(collection?: string) {
      this.Entity = this.FireStoreB.collection(collection as string);
   }
   async add(element: Model) {
      try {
         const row = await this.Entity.add(element);
         return row.id;
      } catch (error) {
         throw error;
      }
   }
   async addWithId(element: Model, id: number | string) {
      try {
         const row =this.Entity.doc(id);
         await row.set(Model);
         return row.id;
      } catch (error) {
         throw error;
      }
   }
   async addWithIncrement(element: Model) {
      let id:number=0;
      try {
         const snapshot = await this.Entity.orderBy('createdAt', 'desc').limit(1).get();
         if (!snapshot.empty) {
           const lastDocument = snapshot.docs[0];
           const last=lastDocument.id;
            id=parseInt(last);
         }
         const row =this.Entity.doc(id);
         await row.set(Model);
         return row.id;
      } catch (error) {
         throw error;
      }
   }
   async delete(element: Model) {
      try {
         const obj=await this.Entity.doc(element.getId());;
         obj.delete();
         return true;
      } catch (error) {
         throw error;
      }
   }
   async deleteWithId(element: string | number) {
      try {
         const obj=await this.Entity.doc(element);
         obj.delete();
         return true;
      } catch (error) {
         throw error;
      }
   }
   async edit(element: Model) {
      try {
         const obj=await this.Entity.doc(element.getId());;
         obj.update(element);
      } catch (error) {
         throw error;
      }
   }
   async editWithId(element: Model, id: string | number) {
      try {
         const obj=await this.Entity.doc(id);
         obj.update(element);
         return element;
      } catch (error) {
         throw error;
      }
   }
   async orderById() {
      try {
         const snapshot = await this.Entity.orderBy(firestore.FieldPath.documentId()).get();

         const documents: Array<Model> = [];
         snapshot.forEach((doc: any) => {
            documents.push(Model.setData(doc.data()).fixedId(doc.id));
         });

         return documents;
      } catch (error) {
         throw error;
      }
   }
   async orderBy(field: string, orderby?: string) {
      try {
         const snapshot = await this.Entity.orderBy(field, orderby ?? 'asc').get();

         const documents: Array<Model> = [];
         snapshot.forEach((doc: any) => {
            documents.push(Model.setData(doc.data()).fixedId(doc.id));
         });

         return documents;

      } catch (error) {
         throw error;
      }
   }
   async getAll() {
      try {
         const querySnapshot = await this.Entity.get();

         const documents: Array<Model> = [];
         querySnapshot.forEach((doc: any) => {
            documents.push(Model.setData(doc.data()).fixedId(doc.id));
         });

         return documents;
      } catch (error) {
         throw error;
      }
   }
   async getByID(id: string | number) {
      try {
         const docRef = await this.Entity.doc(id);
         const docSnapshot = await docRef.get();

         if (docSnapshot.exists) {
            return docSnapshot.data();
         } else {
            throw new Error('Not found');
         }
      } catch (error) {
         throw error;
      }
   }
   async count() {
      try {
         const snapshot = await this.Entity.get();
         return snapshot.size;
      } catch (error) {
         throw error;
      }
   }

}
