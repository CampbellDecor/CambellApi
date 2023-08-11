
import FireStore from '../src/FireBase/FireStore';

const db=new FireStore("user");

describe("FireStore",()=>{
    describe("getall",()=>{
        
        test("check output is Array",async ()=>{
            const users=await db.getAll();
            expect(Array.isArray(users)).toBeTruthy();
        })
        test("have a contain {id:'xmhk6LHAF2YuCy2aETDmX0SS4Gx1',data:{name:'Thanush'}} ",async ()=>{
            const users=await db.getAll();
            expect(users[0].name).toBe("Yuka");
        })})
});