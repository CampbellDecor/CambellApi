import Dao from './Dao';


class AdminDao extends Dao{
    constructor(){
        super("admin");
    }
    async Login(email:string,password:string){
        try {
          const user=await this.auth.loginWithemail(email,password);
          return user;
        } catch (error) {
          throw error;
        }
       }
}