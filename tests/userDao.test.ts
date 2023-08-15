import UserDao from '../src/FireBase/Dao/User'
const user=new UserDao();
describe("userDao",()=>{
    describe("getall",()=>{
        test('is array', async () => {
            const users= await user.getall();
            expect(Array.isArray(users)).toBeTruthy();
        });
        test('output is', async () => {
            const users= await user.getall();
            expect(users[0]).toBe({name:"Yuka"});
        });
    })
})