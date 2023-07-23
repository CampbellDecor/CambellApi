import fire from '../src/FireBase/Firebase'

describe("Testing with firebase ",()=>{
    describe("first test firebase properly connected or not",()=>{
        it("firebase version grater then 11",()=>{
            expect(parseFloat(fire.SDK_VERSION)).toBeGreaterThanOrEqual(11);
            
        })
      it("FireAuth connectivity test",()=>{
            
        })
        it("FireStore connectivity test",async ()=>{
            const collectionRef = fire.firestore().collection('test_collection');
            const docRef = collectionRef.doc('test_doc');
            await docRef.set({ testField: 'testValue' });

            // Retrieve the test document
            const snapshot = await docRef.get();
         // Check if the test document has the expected data
            expect(snapshot.exists).toBe(true);
            expect(snapshot?.data()?.testField).toBe('testValue');
            expect(snapshot.exists).toBeTruthy();
            expect(collectionRef.count).toBe(1);
           await  docRef.delete();
        })
        it("Realtime Database connectivity test",()=>{

        })
    })
})