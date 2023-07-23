import fire from '../src/FireBase/Firebase';

describe("Testing with firebase ",()=>{
    describe("first test firebase properly connected or not",()=>{
        it("firebase version grater then 11",()=>{
            expect(parseFloat(fire.SDK_VERSION)).toBeGreaterThanOrEqual(11);  
        })
        it("FireStore connectivity test",async ()=>{
            const collectionRef = fire.firestore().collection('test_collection');
            const docRef = collectionRef.doc('test_doc');
            await docRef.set({ testField: 'testValue' });
            const snapshot = await docRef.get();
         // Check if the test document has the expected data
            expect(snapshot.exists).toBe(true);
            expect(snapshot?.data()?.testField).toBe('testValue');
        });
        describe("FireStore",()=>{
            
        });
    })
})