import fire,{firestore,database} from '../src/FireBase/Fire';

describe("Testing with firebase ",()=>{
    describe("first test firebase properly connected or not",()=>{
        it("firebase version grater then 11",()=>{
            expect(parseFloat(fire.SDK_VERSION)).toBeGreaterThanOrEqual(11);  
        })
        it("FireStore connectivity test",async ()=>{
            const collectionRef = firestore().collection('test_collection');
            const docRef = collectionRef.doc('test_doc');
            await docRef.set({ testField: 'testValue' });
            const snapshot = await docRef.get();
         // Check if the test document has the expected data
            expect(snapshot.exists).toBeTruthy();
            expect(snapshot?.data()?.testField).toBe('testValue');
        });
        it("FireBase RealTime Database",async ()=>{
            const documentref=database().ref('test_collection');
            const eleref=await documentref.child("test");
            await eleref.set({name:"cambell",
                        age:23,
                    married:false});
            expect(eleref.key).toBe("test");
            const ds=await documentref.child("test").once("value");
            let data=await ds.val();
            expect(data.name).toBe("cambell");
            expect(data.age).toBeGreaterThan(20);
        })
    })
})