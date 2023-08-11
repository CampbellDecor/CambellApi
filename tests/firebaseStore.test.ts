
import FireStore from '../src/FireBase/FireStore';

const db=new FireStore("user");

describe("FireStore",()=>{
    describe("addWithId",()=>{
        test('addElement return same id 12365109', async () => {
            const uid=await db.addWithId({name:"Thanush"},"12365109");
            expect(uid).toBe("12365109");
        });
    })
});