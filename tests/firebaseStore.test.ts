
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
        describe("getById",()=>{
        
            test("check output give correct name",async ()=>{
                const user=await db.getByID("fH786YWNi0vHz67Y809I");
                expect(user.name).toBe("Thanush");
            })})
            describe("getBygroup",()=>{
        
                test("check output is array",async ()=>{
                    const user=await db.getGroup(["Z1581157Y4MXl2stVQ63"]);
                    expect(Array.isArray(user)).toBeTruthy();
                })
                test("username is Thanush",async ()=>{
                    const user=await db.getGroup(["Z1581157Y4MXl2stVQ63"]);
                    expect(user[0]).toBe("Yuka");
                })
            })
});