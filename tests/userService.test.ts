import User from "../src/Service/userService";
const user=new User();
describe("userService",()=>{
    describe("getall", ()=>{
        test("return value is array",async ()=>{
            const userlist=await user.getAll();
          expect(Array.isArray(userlist)).toBeTruthy();
        });

    })
})