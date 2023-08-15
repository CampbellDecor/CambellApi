import CambellStore from '../FireBase/FireStore';
import CambellAuth from '../FireBase/FireAuth'
import Service from './Service';
import User,{ UserDetails,UserBuilder} from '../Model/User';
const userStore=new CambellStore("user");
const Auth=new CambellAuth();
export default class Service_user implements Service{
   
     async getAll(){
        try{    
          const userDetails:Array<UserDetails>=[];     
          const users=await userStore.getAll();
          users.map(
            user=>{
              const {id,...other}=user;
              const userDetails=new UserDetails(user);
            }
          )
          
        
          return users;
        }catch(error){
            throw error;
        }
    }

}