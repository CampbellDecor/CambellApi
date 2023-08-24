const Firestore = require( "./FireStore" );
const fireStorr = new Firestore( "test" );
describe( 'FireStore', () =>
{
    
        test("getall return empty array didn't add any collection",async () => {
            await expect( fireStorr.getAll() ).resolve.toBe( [] );
    });
});