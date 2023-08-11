import { describe } from 'node:test';
import CamnellAuth from '../src/FireBase/FireAuth';
const Auth =new CamnellAuth();
describe("firebase Auth",()=>{
    describe("createWithEmail", ()=>{
        // test("create user account return randam string id",async()=>{
        //        const uid=await  Auth.CreateUserWithEmail("thanujan126@gmail.com","Thanush126");
        //        expect(typeof(uid)=='string').toBeTruthy();
        // })
    })
    describe("findBy Method",()=>{
        test("undefiend key pass return error Parameters undefined",async ()=>{
            await expect(Auth.findBy()).rejects.toEqual(Error("Parameters undefined"));
        })  
        test("pass Wrong key return ",async ()=>{
            await expect(Auth.findBy("name","Thanush")).rejects.toEqual(Error("unknown Field"));
        })
        test("pass email and wrong format throw error Email is Wrong ",async ()=>{
            await expect(Auth.findBy("email","Thanush")).rejects.toEqual(Error("Email is Wrong"));
        })
        test("pass correct email sent idenify ",async ()=>{
            const user=await Auth.findBy("email","thanumahee440@gmail.com");
            expect(user?.user).toBeDefined();
        })
        test("pass correct mobile sent idenify ",async ()=>{
            const user=await Auth.findBy("mobile","+94766859048");
            expect(user.user).toBeDefined();
        })
    })
    
})