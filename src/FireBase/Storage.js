// @ts-nocheck
const Firebase = require( "./Fire.js" );
const FStorage = Firebase.storage();
const Budget = Firebase.storage().bucket();
exports.uploadAImage = async ( path="",saveFolder="" ) =>
{
    try {
        const phtoepath = path.split( "/" );
        const photoname = phtoepath[ phtoepath.length - 1 ];
        const extenstion = photoname.substring( photoname.lastIndexOf( "." ) );
        const newFileName = `${saveFolder}/${ new Date().toISOString() }${ extenstion }`;
        const result = await Budget.upload( path, {
            destination: newFileName
        } );
        return newFileName;
    } catch (error) {
        throw error;
    }
   
};