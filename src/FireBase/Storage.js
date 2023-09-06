// @ts-nocheck
const Firebase = require( "./Fire.js" );
const FStorage = Firebase.storage();
const Budget = Firebase.storage().bucket();
const uploadAImage = async ( path="",saveFolder="" ) =>

{
    const phtoepath = path.split( "/" );
    const photoname = phtoepath[ phtoepath.length - 1 ];
    const extenstion = photoname.substring( photoname.lastIndexOf( "." ) );
    const newFileName = `${saveFolder}/${ new Date().toISOString() }${ extenstion }`;
    const result = await Budget.upload( path, {
        destination: newFileName
    } );
    const file=Budget.file(newFileName);
    const [url]=await file.getSignedUrl({
      action:'read',
      expires:"1h"
    } )
    return url;

};
uploadAImage().then( console.log );