import validator from 'validator';

import { auth } from './Fire';

export default class FireAuth{
    async CreateUserWithEmail(email:string,password:string,mobile?:string){
            try {
                const user=await auth().createUser({
                    email,
                    password
                } );
                if ( mobile !== undefined )
                {
                    const usermobil = await auth().updateUser( user.uid, {
                        phoneNumber: mobile
                    })
                }
                return user.uid;
            } catch (error) {
                throw error;
            }
    }
    async findBy(key?:string,value?:string){
            if(key!=undefined && value !=undefined){
                try {
                    let user,url;
                    if(key=="email" && value!=undefined){
                        if(user=validator.isEmail(value)){
                            await auth().getUserByEmail(value);
                          //  url:await this.sendEmailVerify(value);
                        }else{
                            throw  new Error("Email is Wrong");
                        }
                   
                    }else if(key=="mobile" && value!=undefined){
                        if(validator.isMobilePhone(value)){
                            user=await auth().getUserByPhoneNumber(value);
                        }else{
                           throw new Error("Mobile is Wrong");
                        }
                       
                    }else{
                        if(key=="uid"){
                            await auth().getUser(value)}
                        else{
                            throw new Error("unknown Field");
                        }
                    }
                    return {user,url};
                } catch (error) {
                    throw error;
                }
            }else{
                throw new Error("Parameters undefined");
            }
              
    }
    async sendEmailVerify(email:string){
        try {
            const url=auth().generateEmailVerificationLink(email);
            return url;
        } catch (error) {
            throw error;
        }
    }
//     async getall(idset?:Array<String>){
//         try {
//             const userList=await auth().listUsers();
//             let userRecord:Array<any>=[];
//              userList.users.forEach(user=>{
//                     userRecord.push(user.toJSON());
//             }
//             )
//             return userRecord;
//         } catch (error) {
//             throw error;
//         }
//     }
//     async addUser(user:User){
//         try {
//             if(user.getEmail()!==undefined || user.getMobile()!==undefined){
//               const authuser=await auth().createUser({
//                 displayName:user.getUsername(),
//                 phoneNumber:user.getMobile(),
//                 email:user.getEmail(),
//                 photoURL:user.getProfile(),
//             });

//                return authuser.toJSON();
//             }else{
//                 return "Failed inputs";
//             }
           
//         } catch (error) {
//             throw error;
//         }
//     }
//     async edit(user:User){
//         try {
//             await auth().updateUser(user.getId() as string,{
//                 displayName:user.getUsername(),
//                 photoURL:user.getProfile(),
//                 email:user.getEmail(),
//             })
//         } catch (error) {
//             throw error;
//         }
//     }
//     async changeProfile(user:User){
//         try {
//             await auth().updateUser(user.getId() as string,{
//                 photoURL:user.getProfile()
//             })
//         } catch (error) {
//             throw error;
//         }
//     }
//    async verifyEmail(user:User){
//     try {
//         let usere;
//         if(user.getEmail()!=undefined){
//             usere=await auth().getUserByEmail(user.getEmail()as string);
//             let link:string="";
//             if(!usere.emailVerified){
//                  link =await auth().generateEmailVerificationLink(user.getEmail()as string);
//             }
//             return link;

//         }
//     } catch (error) {
//         throw error;
//     }
//    }
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
async loginWithemail(email:string,password:string){
try {
    const user=await auth().getUserByEmail(email);
   const token=await auth().createCustomToken(user.uid,{ expiresIn: '1h'});   
   return {
    success:true,token,message:"login",uid:user.uid
   }
} catch (error) {
        throw {
        success:false,message:error,uid:null      
    }
}
}

}

