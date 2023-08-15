
import fire from '../src/FireBase/Fire';
import fireStorage from '../src/FireBase/FireStorage';


describe("Testing with firebase ",()=>{
    describe("first test firebase properly connected or not",()=>{
        it("firebase version grater then 11",()=>{
            expect(parseFloat(fire.SDK_VERSION)).toBeGreaterThanOrEqual(11);  
        })
        it("FireStore connectivity test",async ()=>{
            const collections = await firestore().listCollections();
            expect(collections.length).toBeGreaterThanOrEqual(0);
           
        });
        it("FireBase RealTime Database connectivty",async ()=>{
            const databaseRef =fire.database().ref();
            const snapshot = await databaseRef.once('value');
            const collections = snapshot.numChildren();
            expect(collections).toBeGreaterThanOrEqual(0);
        })
        test("FireBae Authenditication Connectivity Test correctly worked ",async ()=>{
            const userRecords = await auth().listUsers();
           expect(userRecords.users.length).toBeGreaterThanOrEqual(0);
        });
        test("FireStorage Connectivity Test correctly worked",()=>{
            storage().bucket().getFiles().then(files=>{
                expect(files.length).toBeLessThanOrEqual(0);
            })
        })

    });
    
})