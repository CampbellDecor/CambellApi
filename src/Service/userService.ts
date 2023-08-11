import CambellStore from '../FireBase/FireStore';
import CambellAuth from '../FireBase/FireAuth'
import Service from './Service';
const userStore=new CambellStore("user");
const Auth=new CambellAuth();
export default class Service_user implements Service{
   
     async getAll(){
        try{
          const users=await userStore.getAll();
          return users;
        }catch(error){
            throw error;
        }
    }

}