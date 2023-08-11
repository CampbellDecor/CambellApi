import Dao from './Dao';
import {UserBuilder,UserDetails,userHistory,AccountActivity} from "../../Model/User";


export default class UserDao extends Dao{
    constructor(){
        super("user");
    }
   async createUser(email:string,password:string){
      try {
      const user=await this.auth.CreateUserWithEmail(email,password); 
      // const userbuild=new UserBuilder();
      // userbuild.setEmail(email).setUsername(email.substring(0,email.indexOf("@")));
      // const Userdoc=new UserDetails(userbuild.getUser()); 
      //   return this.store.addWithId(Userdoc,user);
      return user;
      } catch (error) {
        throw error;
      }
   }
  }