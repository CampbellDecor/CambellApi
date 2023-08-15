import Store from "../src/FireBase/FireStore";
import Fire from "../src/FireBase/Fire";

describe("FireStore",()=>{
    describe("count",()=>{
        const store=new Store("test_collection");
        it("test_collection Count is 1",async ()=>{
            await expect(store.count()).resolves.toBe(1);
        });
        it("test_collection grater then Count is 1",async ()=>{
            await expect(store.count()).resolves.not.toBe(2);
        })
        
    });
    describe("getByid",()=>{
        const store1=new Store("test_collection");
        test("test_doc",async()=>{
            await expect(store1.getByID("test_doc")).resolves.toEqual({testField:"testValue"});
            await expect(store1.getByID("test_doc")).resolves.not.toBeUndefined();
        });

    });
    describe("getAll",()=>{
        const store2=new Store("test_collection");
        test("get all collection in test_collection",async()=>{
            await expect(store2.getAll()).resolves.toContain({testField:"testValue"});
        })
        test("get all collection in test_collection is array",()=>{
            store2.getAll()
            .then(datas=>{
                expect(Array.isArray(datas)).toBeTruthy();
            });
        });
    })
});