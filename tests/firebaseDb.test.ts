import DB from "../src/FireBase/FireBaseDB"
const Mydb=new DB("chat");

describe("FirebaseRealTime Database",()=>{
    describe('getall', () => {
        test('Get outPut is array ', async () => {
              const allchats=await Mydb.getAll();
              expect(Array.isArray(allchats)).toBeTruthy();
    })
    test('Defiend output ', async () => {
        const allchats=await Mydb.getAll();
        expect(allchats).not.toBeUndefined();
})
test('lenth grster then 1', async () => {
    const allchats=await Mydb.getAll();
    expect(allchats.length).toBeGreaterThan(0);
})

test('output is', async () => {
    const allchats=await Mydb.getAll();
    expect(allchats).toBe(["chats"]);
})




})
})