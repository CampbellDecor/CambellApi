import fire from './Firebase';
import { User } from '../Model/User';
const Auth=fire.auth();
export class FireAuth{
    static async add(user:User){
        try {
          const newuser=await Auth.createUser({
                email:user.getEmail(),
                password:user.getPassword(),
                phoneNumber:user.getMobile(),
                displayName:user.getUsername(),
                photoURL:user.getProfile()

            });
            user.setUid(newuser.uid);
            return user;

        } catch (error) {
            throw error;
        }
    }
    static async delete(user:string){
        try {
                await Auth.deleteUser(user);
        } catch (error) {
            throw error;
        }
    }
    static async edit(user:User){
        try {
            if(user?.getUid()!=undefined)
                await Auth.updateUser( user.getUid() as string,{
                    displayName:user.getUsername(),
                    password:user.getPassword(),
                    email:user.getEmail(),
                    phoneNumber:user.getMobile(),
                    photoURL:user.getProfile()
            });
        } catch (error) {
            
        }
    }
}
module.exports=FireAuth;

