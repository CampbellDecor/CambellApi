import CamnellAuth from '../src/FireBase/FireAuth';
const Auth =new CamnellAuth();
describe("firebase Auth",()=>{
    describe("getAll", ()=>{
        test("contain  xmhk6LHAF2YuCy2aETDmX0SS4Gx1",async()=>{
        await expect(Auth.getall()).resolves.toBeDefined();
        })
    })
})