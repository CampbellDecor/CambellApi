import {auth} from './Fire';

import User,{UserBuilder} from '../Model/User';


export default class FireAuth{
    async getall(idset?:Array<String>){
        try {
            const userList=await auth().listUsers();
            let userRecord:Array<any>=[];
             userList.users.forEach(user=>{
                    userRecord.push(user.toJSON());
            }
            )
            return userRecord;
        } catch (error) {
            throw error;
        }
    }
    async addUser(user:User){
        try {
            if(user.getEmail()!==undefined || user.getMobile()!==undefined){
              const authuser=await auth().createUser({
                displayName:user.getUsername(),
                phoneNumber:user.getMobile(),
                email:user.getEmail(),
                photoURL:user.getProfile(),
            });

               return authuser.toJSON();
            }else{
                return "Failed inputs";
            }
           
        } catch (error) {
            throw error;
        }
    }
    async edit(user:User){
        try {
            await auth().updateUser(user.getId() as string,{
                displayName:user.getUsername(),
                photoURL:user.getProfile(),
                email:user.getEmail(),

            })
        } catch (error) {
            throw error;
        }
    }

    async changeProfile(user:User){
        try {
            await auth().updateUser(user.getId() as string,{
                photoURL:user.getProfile()
            })
        } catch (error) {
            throw error;
        }
    }
   async verifyEmail(user:User){
    try {
        let usere;
        if(user.getEmail()!=undefined){
            usere=await auth().getUserByEmail(user.getEmail()as string);
            let link:string="";
            if(!usere.emailVerified){
                 link =await auth().generateEmailVerificationLink(user.getEmail()as string);
            }
            return link;

        }
    } catch (error) {
        throw error;
    }
   }
//    async changeEmail(user:User){
//     try {
//         let usere;
//         if(user.getEmail()!=undefined){
//             usere=await auth().getUser(user.getId()as string);
//             let link:string="";
//             if(!usere.emailVerified){
//                  link =await auth().generateEmailVerificationLink(user.getEmail()as string);
//             }else{

//             }
//             return link;

//         }
//     } catch (error) {
//         throw error;
//     }
//    }

}

