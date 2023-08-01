import {auth} from './Fire';
import {User,UserBuilder} from '../Model/User';

export default class FireAuth{
    async getall(){
        try {
            const userList=await auth().listUsers();
            userRecord:Array<User>;
            userList.users.forEach(user=>{
                const userbuilder=new UserBuilder();
                userbuilder
                .setEmail(user.email??"")
                .setMobile(user.phoneNumber??"")
                .setIsblock(user.disabled)
                .setUsername(user.displayName??"")
                .setProfile(user.photoURL??"")
                .setUid(user.uid)
            })
        } catch (error) {
            throw error;
        }
    }

}