import fire from '../src/FireBase/Firebase'

describe("Testing with firebase ",()=>{
    describe("first test firebase properly connected or not",()=>{
        it("firebase version grater then 11",()=>{
            expect(parseFloat(fire.SDK_VERSION)).toBeGreaterThanOrEqual(11);
            
        })
      it("FireAuth connectivity test",()=>{

        })
        it("FireStore connectivity test",()=>{

        })
        it("Realtime Database connectivity test",()=>{

        })
    })
})