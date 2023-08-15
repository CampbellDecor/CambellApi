import DB from "../src/FireBase/FireBaseDB";
import Fire from "../src/FireBase/Fire";
import {Model} from '../src/Model/Model'
describe("FireBase RealTime Database",function(){
    describe("addWithIncrement",()=>{
        let sdb3=new DB("test1");
       test("add a element in auto Increment first element id return 0",async ()=>{
        expect(sdb3.addWithIncrement({name:"test1",testing:12})).resolves.toBe(0;)
  
       })
    })
    describe("add",()=>{
        let sdb1=new DB("test2");
       
    });
    describe("addwithId",()=>{
        let sdb2=new DB("test3");
       
    })
   
});