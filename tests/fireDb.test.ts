import DB from "../src/FireBase/FireBaseDB";
import Fire from "../src/FireBase/Fire";
import {Model} from '../src/Model/Model'
describe("FireBase RealTime Database",function(){
    describe("count",()=>{
        let sdb=new DB("service");
        test("service collection count is 3",async ()=>{
            await expect(sdb.count()).resolves.toBe(3);
            await expect(sdb.count()).resolves.not.toBe(1);
            await expect(sdb.count()).resolves.not.toBe(12);
        });
        test("service collection count grater then 0",async ()=>{
            await expect(sdb.count()).resolves.toBeGreaterThanOrEqual(0);
        });
        const udb=new DB("user");
        test("user collection count is 3",async ()=>{
            await expect(udb.count()).resolves.toBe(5);
            await expect(udb.count()).resolves.not.toBe(4);
            await expect(udb.count()).resolves.not.toBe(10);
        });
        test("user collection count grater then 0",async ()=>{
            await expect(udb.count()).resolves.toBeGreaterThanOrEqual(0);
            await expect(udb.count()).resolves.toBeGreaterThanOrEqual(1);
        });
    });
    describe("getById",function(){
        const expectedData_2 = { age: 49, name: "food" };
        const serdb=new DB("service");
        test("in Service Database Entitty id=2 return a { age: 49, name: 'food' }",async ()=>{
          expect(serdb.getByID(2)).resolves.toEqual(expectedData_2);
        })
        test("throw exception No data found for ID: 21",async ()=>{
            expect(serdb.getByID(21)).rejects.toThrow('No data found for ID: 21');
        })
    });
    describe("getAll",()=>{
        const userdb=new DB("user");
        test("getAll user contain {name:89867}",async ()=>{
            await expect(userdb.getAll()).resolves.toContain({name:89867});
            await expect(userdb.getAll()).resolves.toContain({name:12});
        });
        test("return array lenght grater then 0",()=>{
            userdb.getAll().then(data=>{
                expect(data.length).toBeGreaterThan(0);
            })
        });
        test("GetAll method return array",async ()=>{
           await expect(userdb.getAll()).resolves.not.toBeUndefined();
        })
    })
    describe("delete",()=>{
       
        const servicedb=new DB("service");
        test("delete a object using delete function", async ()=>{
            await expect(servicedb.delete({} as Model)).resolves.not.toContain({})
        })
    })
});