import fire from './Firebase';
import {User} from '../Model/User'
const Auth=fire.auth();
class FireAuth{
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
            
        }
    }
}

