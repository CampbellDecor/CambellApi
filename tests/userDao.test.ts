import UserDao from '../src/FireBase/Dao/User'
const user=new UserDao();
describe("userDao",()=>{
    describe("CreateUser",()=>{
        test('return out put is string', async () => {
               const result=await  user.createUser("mtthanu126@gmail.com","123456789");
                expect(result==='string').toBeTruthy();
        });
    
    })
})